import express,{Request,Response,NextFunction} from 'express';
import { EditVandor, vandorLoginInput } from "../dto/Vandor.dto"
import vandor from "../Models/Vandor.model";
import { GenerateToken, validatePassword } from '../Utils/PasswordUtils';
import food from '../Models/Food';
import { CreateFoodInput } from '../dto/Food.dto';


export const Vandorlogin = async (req:Request,res:Response, next:NextFunction):Promise<Response|any>=>{
    const{email, password}=<vandorLoginInput> req.body;
    const existingVandor= await vandor.findOne({email:email});
    if(existingVandor!==null){
      const validate = await validatePassword(password,existingVandor.password,existingVandor.salt)
       if(validate!==null){
         const signature = GenerateToken({
            _id:existingVandor.id,
            email:existingVandor.name,
            foodType:existingVandor.foodType,
            name:existingVandor.name
         })
          console.log(signature);
          return res.status(200).json(signature);
       }
    }

    return res.status(404).json({'message':'Vandor not found, SignUp to get started'});
}

export const GetVandorProfile = async(req:Request,res:Response, next:NextFunction):Promise<Response|any>=>{

   const user = req.user;
   if(user){
      const vandordata = await vandor.findById(user._id);

      return res.json(vandordata);
   }

   return res.json({"message":"vandor information not found"});

}

export const updateProfile = async(req:Request,res:Response, next:NextFunction):Promise<Response|any>=>{
  const user = req.user;
  if(user){
     const {name,foodType,phone,address} = req.body as EditVandor;
     const existingVandor = await vandor.findById(user._id);
     if(existingVandor!==null){
       existingVandor.name = name;
       existingVandor.foodType = foodType;
       existingVandor.phone = phone;
       existingVandor.address = address;
       const saveresult = await existingVandor.save();
       return res.json(saveresult);
     }

     return res.json(existingVandor);
  }
  return res.json({"message":"vandor information not found"});


}

export const setProfilePic = async(req:Request,res:Response, next:NextFunction):Promise<Response|any>=>{
   const user = req.user;
   if(user){
      const existingVandor = await vandor.findById(user._id);
      const file = req.files as [Express.Multer.File];
      const images = file.map((file:Express.Multer.File)=>file.filename)
      if(existingVandor!==null){
         existingVandor.converImages.push(...images);
        const saveresult = await existingVandor.save();
        return res.json(saveresult);
      }
 
      return res.json(existingVandor);
   }
   return res.json({"message":"vandor information not found"});
 
 
 }

export const updateservice = async(req:Request,res:Response, next:NextFunction):Promise<Response|any>=>{

   const user = req.user;
   if(user){
      const existingVandor = await vandor.findById(user._id);
      if(existingVandor!==null){
         existingVandor.serviceAvailable = !existingVandor.serviceAvailable
        const saveresult = await existingVandor.save();
        return res.json(saveresult);
      }
 
      return res.json(existingVandor);
   }
   return res.json({"message":"vandor information not found"});
 
 

}


export const Addfood = async(req:Request,res:Response,next:NextFunction):Promise<Response|any>=>{
     const user = req.user;
     if(user){
      const {name,price,foodtype,category,description,readytime} = req.body as CreateFoodInput;
      const file = req.files as [Express.Multer.File];
      const images = file.map((file:Express.Multer.File)=>file.filename)
      const existingVandor = await vandor.findById(user._id); 
      if(existingVandor!==null){
       const createFood = await  food.create({
            vandorId:existingVandor.id,
            name: name,
            price:price,
            foodtype:foodtype,
            category:category,
            images:images,
            description:description,
            readytime:readytime,
            rating:0
         })
       
         existingVandor.foods.push(createFood);
         const result = existingVandor.save();
         res.json(result);
          
      }

     }
    return res.json({"message":"vandor information not found"});

}


export const GetFood = async(req:Request,res:Response,next:NextFunction):Promise<Response|any>=>{
     try {
      const user = req.user;
       if(user){
         const foods = await food.find({vandorId:user._id});
         if(foods!==null){
            return res.json(foods);
         }
         return res.status(404).json({"message":'No food found'});
       }
     } catch (error) {
        console.log(error)
     }
}



