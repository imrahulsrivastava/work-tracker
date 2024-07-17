import jwt from "jsonwebtoken";
import catchAsyncError from "./captureAsyncError.js";
import ErrorHandler from "./errorHandler.js";
import usersModel from "../models/user.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    next(
      new ErrorHandler("Please login before accessing this information", 400)
    );
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await usersModel.findById(decode.id);
  req.user = user;

  next();
});
