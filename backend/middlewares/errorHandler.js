import ErrorResponse from "../utils/CustomResponse.js";

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  // mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose validation error
  if (err.name === "Validation Error") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  // sending errors if above condition satisfied - or else server error
  res.statusCode(error.statusCode || 500).json({
    success: false,
    error: error.message || "ServerError",
  });
};

export const notFound = (req, res, next) => {
  const error = new ErrorResponse(`Not found = ${req.originalUrl}`, 404);
  next(error);
};
