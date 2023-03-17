const ErrorResponse = ({ message, statusCode }) => {
  const error = new Error(`Error : ${message} - Statuscode : ${statusCode}`);
  Error.captureStackTrace(error, ErrorResponse);
  return error;
};
export default ErrorResponse;
