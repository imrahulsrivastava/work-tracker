import mongoose from "mongoose";
const {Schema} = mongoose;

const options = {
   username:{
    type:String,
    required:[true,'please enter user name'],
    unique:true
   },
   email:{
    type:String,
    required:[true,'Please enter your email'],
    unique:true
   },
   password:{
    type:String,
    required:[true,'Please enter your password']
   },
   resetPasswordToken: String,
   resetPasswordExpires:String,
}

const userSchema = new Schema(options,{timestamps:true});

const usersModel  =  mongoose.model("User",userSchema);