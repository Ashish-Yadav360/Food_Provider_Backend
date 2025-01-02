import mongoose from "mongoose";

const ConnectMongodb = async()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Successfully Connected to Mongodb')
  } catch (error) {
     console.log(error);
  }
}


export{ConnectMongodb}