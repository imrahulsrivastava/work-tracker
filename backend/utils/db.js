import mongoose from "mongoose";

//making connection to mongodb
const connectDB = async (connectionStr) => {
  try {
    await mongoose.connect(connectionStr);
    console.log("connection to mongodb is successfull");
  } catch (error) {
    throw new Error("connection to mongodb failed");
  }
};

export default connectDB;
