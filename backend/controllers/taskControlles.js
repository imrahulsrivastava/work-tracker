import catchAsyncError from "../utils/captureAsyncError.js";
import taskModel from "../models/task.js";
import ErrorHandler from "../utils/errorHandler.js";


//*********************create Task => /api/v1/task/new  */********************** */
export const createTask = catchAsyncError(async (req, res, next) => {
  const user = req.user.id;
  const task = await taskModel.create({ ...req.body, user });
  res.status(201).json({ success: true, data: task });
});


// ************************get all task => /api/v1/tasks**************
export const getAllTask = catchAsyncError(async (req, res, next) => {
  const user = req.user.id;
  const tasks = await taskModel.find({ user });

  if (tasks?.length === 0 || !tasks) {
    return next(new ErrorHandler("no task found", 404));
  }
  res.status(200).json({ success: true, data: tasks });
});



// ************************get single task => /api/v1/tasks/:id**************
export const getSingleTask = catchAsyncError(async (req, res, next) => {
  const task = await taskModel.findById(req.id);

  if (task?.length === 0 || !task) {
    return next(new ErrorHandler("no task found", 404));
  }
  res.status(200).json({ success: true, data: task });
});



// ************************update task => /api/v1/tasks/:id**************
export const updateTask = catchAsyncError(async (req, res, next) => {
  let task = await taskModel.findById(req.params.id);

  if (task?.length === 0 || !task) {
    return next(new ErrorHandler("no task found", 404));
  }
  task = await taskModel.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({ success: true, data: task });
});



// ************************delete task => /api/v1/tasks/:id**************
export const deleteTask = catchAsyncError(async (req, res, next) => {
  let task = await taskModel.findById(req.params.id);

  if (task?.length === 0 || !task) {
    return next(new ErrorHandler("no task found", 404));
  }
  await taskModel.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, message: "task deleted" });
});
