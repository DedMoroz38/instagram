const pool = require('../db');

exports.sendMessage = async (message) => {
  return await pool.query(
    `INSERT INTO messages
      (conversation_id, sender_id, message, message_type)
      VALUES($1, $2, $3, 'text') 
    RETURNING *`,
    [message.conversation_id, message.sender_id, message.message]
  );
}

exports.getConversationsByUserId = async (userId) => {
   
  return await pool.query(
    `
    SELECT 
      user_id,
      conversation_id,
      users.full_name,
      users.photo
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
      CAST(conversation_id AS INT),
      CAST(sender_id AS INT),
      message,
      created_at
    FROM (
      SELECT
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

exports.getPastMessagesByUserId = async (leftBound, rightBound, conversationId) => {
  return await pool.query(
    `
    SELECT
      CAST(conversation_id AS INT),
      CAST(sender_id AS INT),
      message,
      messages.id,
      created_at
    FROM (
      SELECT
      conversation_id,
      message,
      messages.id,
      created_at,
      sender_id,
      row_number () OVER (
        PARTITION BY
            conversation_id
        ORDER BY
          created_at DESC
        ) AS message_number
      FROM messages) messages
    WHERE message_number BETWEEN $1 AND $2
      AND conversation_id = $3;
    `,
    [leftBound, rightBound, conversationId]
  )
}

exports.getSenderId = async (conversation_id, sender_id) => {
  return await pool.query(
    `
    SELECT 
      user_id
    FROM participants
      WHERE conversation_id = $1
      AND user_id != $2 
    `,
    [conversation_id, sender_id]
  )
}