import ErrorHandler from "./errorHandler.js";

const errors = (err, req, res, next) => {
  //******************* */ development mode********************
  if (process.env.NODE_ENV === "development") {
    //checking if default err object has all things

    err.message = err.message || "Internal server Error";
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }

  //************* */ production errors*****************************
  if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message || "Internal server Error";
    error.statusCode = err.statusCode || 500;

    //handling duplicate key
    if (err.code === 11000) {
      const message = `${Object.keys(err.keyValue)} already exists `;
      error = new ErrorHandler(message, 400);
    }

    //handling JsonWebTokenError
    if (err.name === "JsonWebTokenError") {
      const message = "Please login to accesss this resource";
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

export default errors;
