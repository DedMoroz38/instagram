const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require('../utils/appErrors');
const { promisify } = require('util');


const signToken = id => {
  return jwt.sign(
    { 
      id: id 
    }, 
      process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );
}

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.id);

  res.cookie('jwt', token, {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
      httpOnly: true, //no way to be modified by the client
      // secure:  req.secure || req.headers["x-forwarded-proto"] === 'https' //only works with https to encrypt it
  });
  user.password = undefined;
  user.password_confirm = undefined;
  res.status(statusCode).json({
      status: "success",
      token,
      user
  });
}

exports.signup = catchAsync(async (req, res) => {
  // NOTE - make Yup validation
  const { password } = req.body;
  const passwordHash = await User.createHash(password);
  const newUser = await User.create({
    full_name: req.body.full_name,
    user_name: req.body.user_name,
    login: req.body.login,
    password: passwordHash,
    password_confirm: req.body.password_confirm,
    password_changed_at: req.body.password_changed_at
  });
  createSendToken(newUser.rows[0], 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  let {login, password} = req.body;
  if(!login || !password) {
      return next(new AppError("Please provide login and password!", 400));
  }

  const user = await (await User.findOne(login)).rows[0];
  if(!user || !(await User.checkPassword(password, user.password))){
      return next(new AppError("Incorrect email or password!", 401));
  }
  createSendToken(user, 200, req, res);
});


// TODO add - catchAsync
exports.logout = (req, res) => {
  res.cookie('jwt', "loggedOut", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
  }); 
  res.status(200).json({ status: "success" });
}

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.cookies.jwt) {
      token = req.cookies.jwt;
  }
  if(!token){
      return next(new AppError("You are not logged in!", 401));
  }
  //Checks is user wasn't deleted
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await (await User.findById(decoded.id)).rows[0];
  if(!currentUser) {
      return next(new AppError('The user with this token is not longer exist!', 401));
  }
  //Check if password wasn't changed
  if(User.changedPassowrdAfter(decoded.iat, currentUser.password_changed_at)){
      return next(new AppError('User changed his password. Please log in again!', 401));
  }
  req.user = currentUser;
  
  next();
});