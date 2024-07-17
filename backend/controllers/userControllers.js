import usersModel from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../utils/captureAsyncError.js";

// get user profile  => /api/v1/profile
const getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await usersModel.findById(req.user.id).select('-__v');
  res.status(200).json({
    success:true,
    data:user
  })
});

// get all user admin route => //api/v1/admin/users
const getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await usersModel.find();
  res.status(200).json({
    sucess: true,
    data: users,
  });
});

export { getAllUser, getUserProfile };
