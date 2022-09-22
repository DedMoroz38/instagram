const pool = require('../db');

exports.createPostForUserId = async (userId, attachments) => {
  let SQL = `
    BEGIN;
      DO $$
      DECLARE
        postIdFromPosts integer; 
      BEGIN
          INSERT INTO posts
              (userId)
              VALUES(${userId}) RETURNING id INTO postIdFromPosts;
          INSERT INTO attachments 
              (postId, fileName)
              VALUES
  `
  const attachmentsLength = attachments.length;
  for(let fileName of attachments){
    SQL += `(postIdFromPosts, '${fileName}')`;
    if(fileName != attachments[attachmentsLength - 1]){
      SQL += `,\n`;
    } else {
      SQL += `;`;
    }
  }
  SQL += `
    END; $$;
  COMMIT;`
  return await pool.query(SQL);
};

exports.getPostsByUserId = async (userId) => {
  console.log(userId);
  return await pool.query(
    `
    SELECT 
      posts.id AS "postId",
      attachments.id AS "attachmentId",
      attachments.filename AS "fileName"
    FROM attachments
    INNER JOIN posts
      ON posts.id = attachments.postId
        AND posts.userId = $1;
    `,
    [userId]
  );
};

exports.getUserFollowingPostsByUserId = async (userId) => {
  return await pool.query(
    `
    SELECT 
      posts.id AS "postId",
      attachments.id AS "attachmentId",
      attachments.filename AS "firstPostAttachment",
      users.user_name AS "userName",
      users.photo AS "userPhoto"
    FROM attachments
    INNER JOIN posts
      ON posts.id = attachments.postId
        AND posts.userId IN (SELECT getter FROM friends WHERE sender = $1)
    INNER JOIN users
      ON users.id = posts.userId;
    `,
    [userId]
  )
}