import mongoose,{Schema,Document} from "mongoose"
export interface fooddoc extends Document{
    vandorId :string,
    name:string,
    description:string,
    category:string,
    foodtype:string,
    readytime:number,
    price:number,
    rating:string,
    images:[string]
}


const foodSchema = new Schema({
    vandorId:{
        type:mongoose.Schema.ObjectId,
        ref:'vandor',
        required:true
    },
   name:{
     type:String,
     required:true
   },
   description:{
     type:String
   },
   category:{
    type:String
   },
   foodtype:{
    type:String
   },
   readytime:{
    type:Number,
    required:true
   },
   price:{
    type:Number,
    rquired:true
   },
   rating:{
    type:String
   },
   images:{
    type:[String]
   }
},{timestamps:true})

const food =  mongoose.model<fooddoc>('food',foodSchema);

export default food;