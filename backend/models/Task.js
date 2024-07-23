import { Schema, model } from "mongoose";

const options = {
  title: {
    type: String,
    required: [true, "Please provide title"],
  },
  description: {
    type: String,
  },
  targetTime: {
    type: String,
    required: [true, "Please provide target time"],
  },
  targetDate: {
    type: String,
    required: [true, "Please provide target date"],
  },
  priority: {
    type: String,
    enum: {
      values: ["Low", "Moderate", "High"],
      message: "Please select the priority level",
    },
    default: "Low",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  audio: {
    type: String,
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
};

const taskSchema = new Schema(options, { timestamps: true });

const taskModel = model("Task", taskSchema);

export default taskModel;
