import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    minLength: [8, "Password length should be more than 8 character"],
    select: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpires: String,
};

//adding timestamps when creating the user
const userSchema = new Schema(options, { timestamps: true });

// hashing password before save
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJwtToken = function () {
  const payload = { id: this._id };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

const usersModel = model("User", userSchema);

export default usersModel;
