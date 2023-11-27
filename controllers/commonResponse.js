const handleResponse = (res, statusCode, message = null) => {
  res.status(statusCode).json(message);
};

export default handleResponse;
