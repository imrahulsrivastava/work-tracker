import catchAsyncError from "../utils/captureAsyncError.js";
import usersModel from "../models/user.js";
import sendToken from "../utils/jwttokens.js";

// register a user => /api/v1/register
const register = catchAsyncError(async (req, res, next) => {
  const user = await usersModel.create(req.body);
  sendToken(user, 200, "Registered successfully", res);
});

// login a user => /api/v1/login
const loginUser = catchAsyncError(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ErrorHandler("Provide both username and password", 400));
  }

  const user = await usersModel.findOne({ username }).select("+password");

  // check if user exist or not
  if (!user) {
    return next(new ErrorHandler("Invalid username or password", 401));
  }

  const isPasswordCorrect = await user.comparePassword(password);

  // check if password is correct
  if (!isPasswordCorrect) {
    return next(new ErrorHandler("Invalid username or password", 401));
  }

  sendToken(user, 200, "Login successful", res);
});

export { register, loginUser };
