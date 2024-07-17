import catchAsyncError from "../utils/captureAsyncError.js";
import usersModel from "../models/user.js";
import sendToken from "../utils/jwttokens.js";
import ErrorHandler from "../utils/errorHandler.js";
import crypto from "crypto";

//********** */ register a user => /api/v1/register**************
const register = catchAsyncError(async (req, res, next) => {
  const user = await usersModel.create(req.body);
  sendToken(user, 200, "Registered successfully", res);
});

//******************* */ login a user => /api/v1/login ***********
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
    return next(new ErrorHandler("Invalid username or password", 400));
  }
  sendToken(user, 200, "Login successful", res);
});

// ********************logout user => /api/v1/logout/**************** */
const logoutUser = catchAsyncError(async (req, res, next) => {
  const token = "none";
  const options = { expires: new Date(Date.now()), httpOnly: true };
  // expiring cookie now
  res.cookie("token", token, options).status(200).json({
    success: true,
    message: "Logout successfull",
  });
});

//***************forgot passwrd => /api/v1/password/forgot***************
const forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email, username } = req.body;
  if (!email || !username) {
    return next(new ErrorHandler("provide email and username", 400));
  }
  const user = await usersModel.findOne({ email, username });
  if (!user) return next(new ErrorHandler("Invalid username or password", 400));
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  res
    .status(200)
    .json({
      success: true,
      message: "Reset Password Token generated successfully",
      resetToken,
    });
});

//******************reset password => /api/v1/password/reset*****************
const resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await usersModel.findOne({
    resetPasswordToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Invalid reset token or token expired", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();
  sendToken(user, 200, "Password reset successfull", res);
});

export { register, loginUser, forgotPassword, resetPassword, logoutUser };
