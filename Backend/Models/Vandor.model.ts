import mongoose,{Schema,Document,Model, mongo, Mongoose} from "mongoose";

 interface VandorDoc extends Document {
  name: string;
  ownername: string;
  foodType: [string];
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  salt: string;
  serviceAvailable:boolean;
  converImages:[string];
  rating:number;
  foods:any;
}

const vandorSchema = new Schema({
    name:{type: String,reqiured:true},
  ownername: {type: String,reqiured:true},
  foodType: {type: [String]},
  pincode: {type: String,reqiured:true},
  address: {type: String},
  phone: {type: String,reqiured:true},
  email: {type: String,reqiured:true, unique:true},
  password: {type: String,reqiured:true},
  salt: {type: String,reqiured:true},
  serviceAvailable:{type: Boolean},
  converImages:{type: [String]},
  rating:{type: String},
  foods:[{
    type:mongoose.Schema.ObjectId,
    ref:'food'
  }],
  
},{
  toJSON:{
    transform(doc,ret){
      delete ret.password,
      delete ret.salt 
    }
  },
  timestamps:true
})

const vandor = mongoose.model<VandorDoc>('vandor',vandorSchema);

export default vandor;