import { Schema, model } from "mongoose";

const options = {
  username: {
    type: String,
    required: [true, "Please enter your username"],
    unique: true,
  },

  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength:[8,'Password length should be more than 8 character'],
    select:false
  },


  resetPasswordToken: String,
  resetPasswordExpires: String,
};

const userSchema = new Schema(options, { timestamps: true });

const usersModel = model("User", userSchema);

export default usersModel;

