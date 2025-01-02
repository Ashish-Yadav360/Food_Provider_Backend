import bcrypt from 'bcryptjs'
import { VandorPayload } from '../dto/Vandor.dto';
import express,{Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import { AuthPayload } from '../dto/Auth.dto';
import { classToClassFromExist } from 'class-transformer';
export const GenerateSalt = async ()=>{
   return await  bcrypt.genSalt(10);
}


export const HashPassword = async(password:string, salt:string)=>{
    return await bcrypt.hash(password,salt);
}

export const validatePassword = async(userpassword:string, savedpassword:string, salt:string)=>{
    return await HashPassword(userpassword,salt)=== savedpassword;
}

export const GenerateToken = (payload: AuthPayload):string => {
    try {
       return jwt.sign(payload, process.env.SECRET as string, {
            expiresIn: '1d',
        });
    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Token generation failed');
    }
};

export const validateToken = async(req:Request)=>{
  const signature = req.get('Authorization');
  console.log(signature);
  if(signature){
    const payload = jwt.verify(signature.split(' ')[1],process.env.SECRET as string) as AuthPayload;
    req.user = payload;
    return true;
  }
 
  return false;

}
