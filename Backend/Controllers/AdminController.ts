import express,{Request,Response,NextFunction} from 'express';
import { CreateVandorInput } from '../dto/Vandor.dto';
import vandor from '../Models/Vandor.model';
import { GenerateSalt, HashPassword } from '../Utils/PasswordUtils';

export const CreateVandor = async (req: Request, res: Response, next: NextFunction): Promise<Response | any> => {
  try {
    const { name, address, pincode, ownername, foodType, phone, email, password } = req.body as CreateVandorInput;
    const existingVandor = await vandor.findOne({ email: email });
    console.log(existingVandor)
    if (existingVandor !== null) {
      return res.json({ 'Message': 'Vandor already exists with this email id' });
    }
     
    const salt = await GenerateSalt();
    const userPassword = await HashPassword(password as string, salt as string);
    const createVandorData = await vandor.create({
      name: name,
      address: address,
      pincode: pincode,
      ownername: ownername,
      foodType: foodType,
      phone: phone,
      salt: salt,
      email: email,
      rating: 0,
      serviceAvailable: true,
      coverImages: [],
      password: userPassword
    });
    console.log('Vandor created successfully',createVandorData);
    return res.json(createVandorData);
  } catch (error) {
    next(error);
  }
};


export const GetVandors = async(req:Request, res:Response, next:NextFunction):Promise<Response | any>=>{
  try {
    const vandors = await vandor.find({});
  if(vandors!==null){
    return res.json(vandors);
  }

  return res.json({'message':"Vandor not available"})
  } catch (error) {
     console.log(error);
  }
  
}

export const GetVandorsbyId = async(req:Request, res:Response, next:NextFunction):Promise<Response | any>=>{
  try {
    const id = req.params.id;
    const vandordata = await vandor.findById(id);
    if(vandordata!==null){
      return res.status(200).json(vandordata);
    }
    res.status(404).json({'message':'No vandor found for specific id'});
  } catch (error) {
     console.log(error)
  }
}
