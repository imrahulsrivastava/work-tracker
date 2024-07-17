import usersModel from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../utils/captureAsyncError.js";
import sendToken from "../utils/jwttokens.js";

//******************** */ get user profile  => /api/v1/profile**************
const getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await usersModel.findById(req.user.id).select("-__v");
  res.status(200).json({
    success: true,
    data: user,
  });
});

//************ */ update password => /api/v1/password/update*************

const updatePassword = catchAsyncError(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  const user = await usersModel.findById(req.user.id).select("+password");

  const isMatched = user.comparePassword(currentPassword);
  if (!isMatched) {
    return next(new ErrorHandler("Old Password do not match", 401));
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: true });
  sendToken(user, 200, "Password updated", res);
});

//****************** */ get all user admin route => //api/v1/admin/users************
const getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await usersModel.find();
  res.status(200).json({
    sucess: true,
    data: users,
  });
});

export { getAllUser, getUserProfile, updatePassword };
