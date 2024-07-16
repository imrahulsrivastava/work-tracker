import mongoose from 'mongoose';



//making connection to mongodb
const connectDB = async (connectionStr)=>{
   await mongoose.connect(connectionStr);
}

export default connectDB;
