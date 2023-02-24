const pool = require('../db');
const {jsArrayToSQLArrayConverter} = require('../libs/jsArrayToSQLArrayConverter');
const {generateValuesForSQL2} = require('../libs/generateValuesForSQL');

exports.sendMessage = async (message) => {
  return await pool.query(
    `INSERT INTO messages
      (conversation_id, sender_id, message, message_type)
      VALUES($1, $2, $3, 'text') 
    RETURNING id`,
    [message.conversation_id, message.sender_id, message.message]
  );
}

exports.sendFileMessage = async (messageData) => {
  const {conversation_id, sender_id, message, filesToSave} = messageData;

  let SQL =`
      create or replace function get_message_id()
      returns int
      language plpgsql
      as
      $$
      DECLARE
          messageIdFromMessage integer; 
      BEGIN
          INSERT INTO messages
              (conversation_id, sender_id, message, message_type)
              VALUES(${conversation_id}, ${sender_id}, '${message}', 'file') RETURNING id INTO messageIdFromMessage;
          INSERT INTO message_attachments 
              (message_id, file_name, path_name, size)
              VALUES
  `;
  SQL += generateValuesForSQL2(filesToSave, 'messageIdFromMessage');
  SQL += `
      RETURN messageIdFromMessage;   
    END; $$;
  SELECT get_message_id();`

  return await pool.query(SQL);
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

exports.getMessagesByConversationIds = async (conversationIds) => {
  const SQLarray = jsArrayToSQLArrayConverter(conversationIds);

  return await pool.query(
    `
    SELECT
      CAST(conversation_id AS INT),
      CAST(sender_id AS INT),
      message,
      created_at,
      message_id ,
      message_type
    FROM (
      SELECT
      conversation_id,
      message,
      created_at,
      sender_id,
      message_type,
      CAST(messages.id AS INT) AS message_id,
      row_number () OVER (
        PARTITION BY
            conversation_id
        ORDER BY
          created_at DESC
        ) AS message_number
      FROM messages) messages
    WHERE message_number <= 20
      AND conversation_id IN ${SQLarray};
    `
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

exports.getSenderIdByMessageId = async (messageId) => {
  return await pool.query(
    `
    SELECT 
      user_id AS getter_id
    FROM participants
    WHERE user_id != (
      SELECT 
      sender_id
      FROM messages
      WHERE id = ${messageId}
    ) AND conversation_id = (
      SELECT 
        conversation_id
      FROM messages
      WHERE id = ${messageId}
    );
    `
  )
}

exports.getFileNamesByMessageId = (messageId) => {
  return pool.query(`
    SELECT 
      id as attachment_id,
      file_name,
      size
    FROM 
      message_attachments
    WHERE message_id = $1
  `,
  [messageId]
  )
}

exports.getMessageDataId = (messageId) => {
  return pool.query(`
    SELECT
      conversation_id,
      created_at,
      CAST(sender_id AS INT),
      message
    FROM messages
    WHERE id = $1
  `,
  [messageId]
  )
}

exports.getAttachmentById = (attachment_id) => {
  return pool.query(`
    SELECT 
      path_name
    FROM message_attachments
    WHERE id = $1 
  `,
  [attachment_id]
  )
}

exports.getMessageAttachments = (fileMessages) => {
  const sqlIdList = jsArrayToSQLArrayConverter(fileMessages);

  return pool.query(`
    SELECT 
      id AS attachment_id,
      message_id,
      file_name, 
      size
    FROM message_attachments
    WHERE message_id IN ${sqlIdList}
    `,
  )
}