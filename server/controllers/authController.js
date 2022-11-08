const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require('../utils/appErrors');
const { promisify } = require('util');
const Email = require("../utils/emailSender");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const PasswordResetToken = require('../models/passwordResetTokensModel');

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
      // TODO make it work
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
  });
  const user = newUser.rows[0];
  const url = `${req.protocol}://${req.get('host')}/api/v1/users/submitEmail/${user.id}`;
  await new Email(user, url).sendWelcome();
  createSendToken(user, 201, req, res);
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

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const login = req.body.login;
  let user = await User.findByEmail(login);
  user = user.rows[0];
  if (!user) {
      return next(new AppError("There is no user with this email address.", 404));
  }
  const userId = user.id;
  const oldPasswordResetToken = await PasswordResetToken.checkIfTokenExists(userId);
  const passwordResetToken = crypto.randomBytes(32).toString('hex');
  const newPassowrdResetToken = await bcrypt.hash(passwordResetToken, Number(10));

  if (oldPasswordResetToken.rows[0]) {
    await PasswordResetToken.updatePasswordResetTokenByUserId(userId, newPassowrdResetToken);
  } else {
    await PasswordResetToken.savePasswordResetTokenByUserId(userId, newPassowrdResetToken);
  }
  try{
    const resetPasswordURL = `${req.protocol}://localhost:3000/createnewpassword?token=${passwordResetToken}&userId=${userId}`;
    await new Email(user, resetPasswordURL).sendPasswrodReset();

    res.status(200).json({
      status: "success",
      message: "Token sent to email!"
    });  
  } catch(err) {
    return next(new AppError('There was an error with sending email. Try again later!', 500));
  }
});

exports.resetPassword = catchAsync( async (req, res, next) => {
  const {password, passwordResetToken, userId} = req.body;
  const tokenData = await PasswordResetToken.getPasswordResetTokenDataByUserId(userId);
  const {token: tokenFromDB, token_expiry: tokenExpiryDate } = tokenData.rows[0];

  const timeDifferenceInMinutes = (Date.now() - tokenExpiryDate)/1000/60;

  if (timeDifferenceInMinutes > 60){
    return next(new AppError('Password reset token is invalid or has expired', 400));
  }

  const isValidToken = await PasswordResetToken.comparePasswordResetTokens(passwordResetToken, tokenFromDB);

  if (!isValidToken ){
    return next(new AppError('Password reset token is invalid or has expired', 400));
  }
  const passwordHash = await User.createHash(password);

  await PasswordResetToken.updatePassowrdResetByUserId(userId, passwordHash);

  res.status(200).json({
    status: 'success'
  })
})


// TODO add - catchAsync
exports.logout = (req, res) => {
  res.cookie('jwt', "loggedOut", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
  }); 
  res.status(200).json({
    status: "success"
  });
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

