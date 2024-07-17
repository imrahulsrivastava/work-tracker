import catchAsyncError from "../utils/captureAsyncError.js";
import usersModel from "../models/user.js";
import sendToken from "../utils/jwttokens.js";

// register a user => /api/v1/register
const register = catchAsyncError(async (req, res, next) => {
  const user = await usersModel.create(req.body);
  sendToken(user,200,res);
});

// login a user => /api/v1/login
const loginUser = catchAsyncError(async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);

  const user = await usersModel.findOne({ username }).select("+password");
  console.log(user);

  // check if user exist or not
  if (!user) {
    return next(new ErrorHandler("user do not exist", 404));
  }

  const isPasswordCorrect = await user.comparePassword(password);

  // check if password is correct
  if (!isPasswordCorrect) {
    return next(new ErrorHandler("Password is incorrect", 401));
  }

  res.status(200).json({
    success: true,
    message: "Login successfull",
  });
});

export { register, loginUser };
