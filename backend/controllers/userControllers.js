import usersModel from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../utils/captureAsyncError.js";

const getUserProfile = catchAsyncError(async (req, res, next) => {});

// get all user admin route => //api/v1/admin/users
const getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await usersModel.find();
  res.status(200).json({
    sucess: true,
    data: users,
  });
});

export { getAllUser };
