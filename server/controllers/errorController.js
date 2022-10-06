const AppErrors = require('../utils/appErrors');

const handleLoginDublicateError = () => {
  const message = `Email is already registered!`;
  return new AppErrors(message, 500);
}

const handleUserDublicateError = () => {
  const message = `Username is taken!`;
  return new AppErrors(message, 500);
}

const sendErrorDev = (err, req, res) => {
  console.log(err);
  if(req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
  } 
}

const sendErorrProd = (err, req, res) => {
  console.log(err);
  if(err.isOperational) {
      return res.status(err.statusCode).json({
          status: err.status,
          message: err.message
      });
  }
  return res.status(500).json({
      status: 'error',
      message: "Something went wrong!"
  });
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if(process.env.NODE_ENV === 'development'){
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production'){
    let error = { ...err };
    console.log(err);
    if(+error.code === 23505) {
      if(error.constraint === 'users_login_key') error = handleUserDublicateError();
      if(error.constraint === 'users_login_key1') error = handleLoginDublicateError();
    }

    sendErorrProd(error, req, res);
}
}