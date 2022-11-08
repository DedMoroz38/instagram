const pool = require('../db');
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
  } = newUserData;

  return await pool.query(
    `
    INSERT INTO users 
    (full_name, user_name, login, password) 
    VALUES($1, $2, $3, $4)
    RETURNING 
    cast (id as integer),
    full_name,
    login;
    `,
    [full_name, user_name, login, password]
  );
}

exports.findById = async (userId) => {
  return await pool.query(
    "SELECT * FROM users WHERE id=$1",
    [userId]
  );
};

exports.findByEmail = async (email) => {
  return await pool.query(
    `
    SELECT * FROM users 
      WHERE login = $1
    `,
    [email]
  );
}

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
      const passwordChangedTimestamp = passwordChangedAt / 1000;
      return JWTTimestamp < passwordChangedTimestamp;
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
    `INSERT INTO subscriptions
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
    FROM subscriptions, users
    WHERE sender = $1
    AND users.id = subscriptions.getter
    `,
    [userId]
  );
}

exports.submitEmailByUserId = async (userId) => {
  return await pool.query(
      `
      UPDATE users
        SET is_confirmed=true
        WHERE id = $1;
      `,
      [userId]
  );
}

exports.getProfileInfoById = async (userId) => {
  console.log(userId);
  return await pool.query(
    `
    SELECT 
      CAST((SELECT 
          COUNT(userid) AS number_of_posts
        FROM posts
        WHERE userid = $1
      ) AS INTEGER),
      CAST((SELECT 
          COUNT(sender) AS number_of_subscriptions
        FROM subscriptions
        WHERE sender = $1
      ) AS INTEGER),
      CAST((SELECT 
          COUNT(getter) AS number_of_subscribers
        FROM subscriptions
        WHERE getter = $1
      ) AS INTEGER);
      `,
    [userId]
  )
}






