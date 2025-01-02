import mongoose,{Schema,Document} from "mongoose";

export interface customerinterface extends Document{
    firstname:string,
    lastname:string,
    lat:number,
    lng:number,
    email:string,
    phone:string,
    password:string,
    address:string,
    salt:string,
    otp:number,
    otpexpire:Date,
    verified:boolean, 
}

const customerSchema = new Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    lat:{type:Number},
    lng:{type:Number},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    password:{type:String,required:true},
    address:{type:String},
    salt:{type:String,required:true},
    otp:{type:Number},
    otpexpire:{type:Date},
    verified:{type:Boolean}
},{timestamps:true})

const customer = mongoose.model<customerinterface>('customer',customerSchema);

export default customer;