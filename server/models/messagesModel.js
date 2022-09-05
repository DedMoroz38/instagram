const pool = require('../db');

exports.sendMessage = async (message) => {

  return await pool.query(
    'INSERT INTO messages (messageFrom, messageTo, message) VALUES($1, $2, $3) RETURNING *',
    [message.messagefrom, message.messageto, message.message]
  );
}

exports.getMessagesByUId = async (userId) => {

  return await pool.query(
    'SELECT * FROM messages WHERE messagefrom=$1',
    [userId]
  );
}