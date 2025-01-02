import { NextFunction,Request ,Response} from "express";
import { AuthPayload } from "../dto/Auth.dto";
import { GenerateToken, validateToken } from "../Utils/PasswordUtils";


declare global{
    namespace Express {
      export interface Request {
            user?: AuthPayload
        }
    }
}

export const Authenticate = async(req:Request, res:Response, next:NextFunction):Promise<Response|any>=>{
    const validate = await validateToken(req)
    if(validate){
        next();
    }else{
        return  res.json({"message":"user not authorized"});
    }
}