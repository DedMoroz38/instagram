const pool = require('../db');
const catchAsync = require("./../utils/catchAsync");
const bcrypt = require("bcryptjs");

exports.createHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

exports.create = async (newUserData) => {
  const {
    full_name,
    user_name,
    login,
    password,
    password_confirm,
    password_changed_at
  } = newUserData;

  return await pool.query(
    'INSERT INTO users (full_name, user_name, login, password, password_confirm, password_changed_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    [full_name, user_name, login, password, password_confirm, password_changed_at]
  );
}

exports.findById = async (userId) => {
  return await pool.query(
    "SELECT * FROM users WHERE id=$1",
    [userId]
  );
};

exports.findOne = async (login) => {
  return await pool.query(
    "SELECT * FROM users WHERE login=$1",
    [login]
  );
};

exports.checkPassword = async (candidatePassowrd, userPassword) => {
  return await bcrypt.compare(candidatePassowrd, userPassword);
}

exports.changedPassowrdAfter = (JWTTimestamp, passwordChangedAt) => {
  if(passwordChangedAt){
      const changedTimestamp = +(passwordChangedAt.getTime() / 1000);
      return JWTTimestamp < changedTimestamp;
  }
  return false;
}

exports.findByIdAndUpdate = async (userId, filteredBody) => {
  const photo = filteredBody.photo;

  return await pool.query(
    `UPDATE users SET photo = $1 WHERE id = $2`,
    [photo, userId]
  );
}
exports.addToFriends = async (userId, friendUName) => {
  console.log(userId, friendUName);

  return await pool.query(
    `INSERT INTO friends
    (
        sender,
        getter
    )
    VALUES 
    (
     $1,
     (SELECT id from users WHERE user_name = $2)
    );`,
    [userId, friendUName]
  );
}

exports.getFriendByName = async (friendUName) => {
  return await pool.query(
    `SELECT * FROM users WHERE user_name = $1`,
    [friendUName]
  );
}

exports.getFriendsByUserId = async (userId) => {
  return await pool.query(
    `
    SELECT users.full_name, users.id
    FROM friends, users
    WHERE sender = $1
    AND users.id = friends.getter
    `,
    [userId]
  );
}