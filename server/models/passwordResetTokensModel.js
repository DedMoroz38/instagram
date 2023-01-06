const pool = require('../db');
const bcrypt = require("bcryptjs");


exports.savePasswordResetTokenByUserId = async (userId, newPassowrdResetToken) =>{

  const passwordResetExpires = Date.now();

  return await pool.query(
    `
    INSERT INTO password_reset_tokens 
      (user_id, token, token_expiry)
      VALUES ($1, $2, $3);
    `,
    [userId,  newPassowrdResetToken, passwordResetExpires]
  );
}

exports.updatePasswordResetTokenByUserId = async (userId, newPassowrdResetToken) => {
  const passwordResetExpires = Date.now();

  return await pool.query(
    `
    UPDATE password_reset_tokens 
    SET token = $1,
        token_expiry = $2
    WHERE user_id = $3
    `,
    [newPassowrdResetToken, passwordResetExpires, userId]
  );
}

exports.getPasswordResetTokenDataByUserId = async (userId) => {
  return await pool.query(
    `
    SELECT * 
    FROM password_reset_tokens
      WHERE user_id = $1;
    `,
    [userId]
  )
}




exports.getPasswordResetTokenByUserId = async (userId) => {
  return await pool.query(
    `
    SELECT token 
    FROM password_reset_tokens
      WHERE user_id = $1;
    `,
    [userId]
  )
}

exports.comparePasswordResetTokens = async (passwordResetToken, tokenFromDB) => {
  return await bcrypt.compare(passwordResetToken, tokenFromDB); 
}

exports.checkIfTokenExists = async (userId) => {
  return await pool.query(
    `
    SELECT * 
    FROM password_reset_tokens
      WHERE user_id = $1;
    `,
    [userId]
  )

}

exports.updatePassowrdResetByUserId = async (userId, password) => {
  const currentTimeStamp = Date.now();
  console.log(currentTimeStamp);

  return await pool.query(
    `
    UPDATE users
    SET password = $1,
        password_changed_at = $2
    WHERE id = $3
    `,
    [password, currentTimeStamp, userId]
  )
}