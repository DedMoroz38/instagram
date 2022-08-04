const AppErrors = require('../utils/appErrors');


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
  
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if(process.env.NODE_ENV === 'development'){
    sendErrorDev(err, req, res);
  } 
}