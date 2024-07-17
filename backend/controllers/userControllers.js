import usersModel from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../utils/captureAsyncError.js";
import sendToken from "../utils/jwttokens.js";

/**
 * Get a user profile
 * Route - /api/v1/profile
 */
export const getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await usersModel.findById(req.user.id).select("-__v");
  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * Update a user password
 * Route - /api/v1/password/update
 */
export const updatePassword = catchAsyncError(async (req, res, next) => {
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

/**
 * Admin Route
 * Get all users
 * Route - /api/v1/admin/users
 */
export const getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await usersModel.find();
  res.status(200).json({
    sucess: true,
    data: users,
  });
});
