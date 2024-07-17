import usersModel from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../utils/captureAsyncError.js";

const getUserProfile = catchAsyncError(async (req, res, next) => {
  const { id } = req.user;
  if (!id) {
    return next(new ErrorHandler("username is required", 400));
  }

  const user = await usersModel.findById(id);
  if (!user) {
    return next(new ErrorHandler("user doesn't exist", 404));
  }
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
