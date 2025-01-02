import express,{Request,Response,NextFunction} from 'express'
import vandor from '../Models/Vandor.model';
import food, { fooddoc } from '../Models/Food';
import { formatDiagnostic } from 'typescript';

export const GetFoodAvailability= async(req:Request, res:Response):Promise<Response|any>=>{

    
        const pindcode = req.params.pincode;
         const result = await vandor.find({pincode:pindcode, serviceAvailable:true}).sort([['ratings','descending']]).populate('foods');

         if (result.length>0){
            return res.status(200).json(result);
         }else{
            return res.status(404).json({'message':'No data found'});
         }
}


export const TopRestraunt= async(req:Request,res:Response):Promise<Response|any>=>{

    
        const pindcode = req.params.pincode;
         const result = await vandor.find({pincode:pindcode, serviceAvailable:true}).sort([['ratings','descending']]).limit(5);

         if (result.length>0){
            return res.status(200).json(result);
         }else{
            return res.status(404).json({'message':'No data found'});
         }
}


export const FoodIn30Mins= async(req:Request,res:Response):Promise<Response|any>=>{

     const pindcode = req.params.pincode;
     const result = await vandor.find({pincode:pindcode, serviceAvailable:true}).populate("foods")
     let Foodresult:any =[];    
     if(result.length>0){
            result.map((vandor=>{
                const food = vandor.foods as [fooddoc];
             
                Foodresult.push(...food.filter(food=>food.readytime <=30));
            }))

            return res.status(200).json(Foodresult);
         }
}

export const SearchFood= async(req:Request,res:Response):Promise<Response|any>=>{
    
        const pindcode = req.params.pincode;
         const result = await vandor.find({pincode:pindcode, serviceAvailable:true}).populate("foods")
          let foodResult:any=[];
         if (result.length>0){
            result.map(food=>foodResult.push(...food.foods));
            return res.status(200).json(foodResult);
         }else{
            return res.status(404).json({'message':'No data found'});
         }
}

export const FindRestrauntById= async(req:Request,res:Response):Promise<Response|any>=>{

    try {
       const id = req.params.id;
      const restraunt = await vandor.findById(id).populate('foods');
       if(restraunt){
        return res.status(200).json(restraunt)
       }
       return res.status(404).json('No restraunt found');
        
    } catch (error) {
        console.log('Error in FindRestrauntByid controller',error)
    }

    
}
