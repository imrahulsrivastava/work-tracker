import express from "express";
import "dotenv/config";

// File imports
import connectDB from "./utils/db.js";
import errors from "./utils/errors.js";
import ErrorHandler from "./utils/errorHandler.js";

// Route files
import userRoutes from "./routes/userRoute.js";

const app = express();
const PORT = process.env.PORT || 8000;
const mode = process.env.NODE_ENV || "development";

// Handling ReferenceError globally
process.on("uncaughtException", (err) => {
  console.log("aborting server due to uncaught Exception");
  process.exit(1);
});

// Global inbuilt middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home route
app.get("/", (req, res) => {
  res.send("server is working fine make your query at '/api/v1");
});

// Custom routes
app.use("/api/v1", userRoutes);

// Handling unmatched routes
app.all("*", (req, res, next) => {
  return next(new ErrorHandler(`Route ${req.originalUrl} not found`, 404));
});

// Global middleware for handling errors
app.use(errors);

// Establishing connection and starting server
const start = async () => {
  try {
    // Once mongodb connection is established, then only the server will run
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT} in ${mode}`);
    });
  } catch (error) {
    console.log("aborting server due to some error connecting to mongodb");
  }
};

start();
