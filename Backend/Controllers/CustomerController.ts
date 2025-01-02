import express, { Request, Response, NextFunction, request } from 'express';
import {plainToClass} from 'class-transformer'
import { validate, ValidationError } from 'class-validator';
import { customerInputs, EditCustomer, userLoginInput } from '../dto/Customer.dto';
import { GenerateSalt, GenerateToken, HashPassword, validatePassword } from '../Utils/PasswordUtils';
import customer from '../Models/Customer.model';
import { GenerateOTP, RequestOTP } from '../Utils/NotificationUtility';
import CustomerRoute from '../Routes/CustomerRoute';
import { Authenticate } from '../Middleware/CommonAuth';
export const Customersignup = async (req: Request, res: Response, next: NextFunction):Promise<Response|any> => {
    const CustomerInputts = plainToClass(customerInputs,req.body);
    const errors = await validate(CustomerInputts);
     const{otp,otpexpire} = GenerateOTP();
    if(errors.length>0){
        return res.status(400).json(errors);
    }
    const {firstname,lastname,email, password, phone} = CustomerInputts;
    const salt = await GenerateSalt();
    const userPassword = await HashPassword(password as string, salt as string);
    const result = await customer.create({
        email:email,
        password:userPassword,
        phone:phone,
        salt:salt,
        otp:otp,
        otpexpire:otpexpire,
        firstname:firstname,
        lastname:lastname,
        lat:0,
        lag:0,
        verified:false,
    });

    if(result){
        await RequestOTP(CustomerInputts.phone,otp);
        const signature = GenerateToken({
            _id:result._id as string,
            email:result.email,
            verified:result.verified
        })
          return res.json({signature,verified:result.verified,email:result.email});
    }

    return res.status(500).json({'message':'Internal server error with signup'});

}


export const Customerlogin = async (req: Request, res: Response, next: NextFunction):Promise<Response|any> => {
   const loginInputs = plainToClass(userLoginInput,req.body);
   const errors = await validate(loginInputs);

   if(errors.length>0){
       return res.status(400).json(errors);

   }

   const {email,password} = loginInputs
   const customerdata = await customer.findOne({email:email});
   if(customerdata){
    const validation = await validatePassword(password,customerdata.password,customerdata.salt)
    if(validation){
        const signature = GenerateToken({
            _id:customerdata._id as string,
            email:customerdata.email,
            verified:customerdata.verified
        })
        return res.json({signature,verified:customerdata.verified,email:customerdata.email});
   }

   return res.status(400).json({'message':'Invalid email or password'});
}

}



export const verifyCustomer = async (req: Request, res: Response, next: NextFunction):Promise<Response|any> => {

    const {otp} = req.body;
    const customers = req.user;
    if(customers){
        const profile = await customer.findById(customers._id);
        if(profile){
            if(profile.otp===parseInt(otp)&& profile.otpexpire >= new Date()){
                profile.verified = true;
              const updatedProfile = await profile.save();
              const signautre = GenerateToken({
                    _id:profile._id as string,
                    email:profile.email,
                    verified:profile.verified
              })
                return res.json({signautre,verified:updatedProfile.verified,email:updatedProfile.email});
            }else{
                return res.status(400).json({'message':'Invalid OTP'});
        }
    }

}

}


export const getOtp = async (req: Request, res: Response, next: NextFunction) :Promise<Response|any>=> {

    const user= req.user;
    if(user){
        const profile = await customer.findById(user._id);

        if(profile){
            const {otp,otpexpire} = GenerateOTP();
            profile.otp = otp;
            profile.otpexpire=otpexpire;
            await profile.save();
            await RequestOTP(profile.phone,otp);
            return res.status(200).json({'message':'OTP sent successfully'});
        }
    }

}

export const updateCustomerProfile = async (req: Request, res: Response, next: NextFunction) :Promise<Response|any>=> {
    const user = req.user;
    const EditInputs = plainToClass(EditCustomer,req.body);
    const errors = await validate(EditInputs);
    if(errors.length>0){
        return res.status(400).json(errors);
 
    }
    if(user){
    const {firstname,lastname,address} = EditInputs;
    const profile = await customer.findById(user._id);
    if(profile){
        profile.firstname = firstname;
        profile.lastname = lastname;
        profile.address=address;
        const result = await profile.save();
         return res.status(200).json(result);
    }
 
    return res.status(400).json({'message':'Profile not found'});
 }
 
  

}

export const getCustomerProfile = async (req: Request, res: Response, next: NextFunction) :Promise<Response|any>=> {
    const user = req.user;
    if(user){
    const profile = await customer.findById(user._id);
    if(profile){
         return res.status(200).json(profile);
    }
 
    return res.status(400).json({'message':'Customer not found'});
 }
 

}