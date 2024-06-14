const globalErrorHandler = async (error, req, res, next) => {
  if (error) {
    let statusCode = 500;
    if (error?.statusCode) {
      statusCode = error.statusCode;
    }

    res.status(statusCode).json({
      result: "Error",
      error: {
        name: error.name,
        message: error.message,
      },
    });

    console.log(error);
  } else {
    next();
  }
};

module.exports = globalErrorHandler;
