const pool = require('../db');

exports.sendMessage = async (message) => {

  return await pool.query(
    'INSERT INTO messages (message_from, message_to, message, created_at) VALUES($1, $2, $3, $4) RETURNING *',
    [message.message_from, message.message_to, message.message, message.created_at]
  );
}

exports.getMessagesByUId = async (userId) => {

  return await pool.query(
    `SELECT
      CAST(id AS INTEGER),
      CAST(message_from AS INTEGER),
      CAST(message_to AS INTEGER),
      message,
      created_at
    FROM messages WHERE message_from=$1 OR message_to=$1`,
    [userId]
  );
}

exports.getConversationsByUserId = async (userId) => {
   
  return await pool.query(
    `
    SELECT 
      user_id,
      conversation_id,
      users.full_name
    FROM participants
    INNER JOIN conversations
      ON participants.conversation_id = conversations.id
    INNER JOIN users 
      ON users.id = participants.user_id
    AND conversation_id IN (
      SELECT conversation_id
      FROM participants
      WHERE participants.user_id = $1
    ) 
    AND user_id != $1
      ORDER BY updated_at DESC;
    `,
    [userId]
  )
}
exports.getMessagesInARange = async (lower, upper) => {
  return await pool.query(
    `
    SELECT
      CAST(id AS INT),
      CAST(conversation_id AS INT),
      CAST(sender_id AS INT),
      message,
      CAST(created_at AS INT)
    FROM (
      SELECT
      id,
      conversation_id,
      message,
      created_at,
      sender_id,
      row_number () OVER (
        PARTITION BY
            conversation_id
        ORDER BY
          created_at DESC
        ) AS message_number
      FROM messages) messages
    WHERE message_number <= 20
      AND conversation_id BETWEEN $1 AND $2
    `,
    [lower, upper]
  )
}