const pool = require('../db');
const {jsArrayToSQLArrayConverter} = require('../libs/jsArrayToSQLArrayConverter');
const {generateValuesForSQL} = require('../libs/generateValuesForSQL');


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
  `;
  SQL += generateValuesForSQL(attachments, 'postIdFromPosts');
  SQL += `
    END; $$;
  COMMIT;`
  return await pool.query(SQL);
};

exports.getPostsByUserId = async (userId) => {
  return await pool.query(
    `
    SELECT
      CAST(posts.id AS INT) AS "postId",
      attachments.filename AS "firstPostAttachment",
      users.user_name AS "userName",
      users.photo AS "userPhoto",
      CAST(attachments.id AS INT) AS "attachmentId"
    FROM (
      SELECT
      filename,
      postid,
      id,
      row_number() OVER (
        PARTITION BY
            postid
        ) AS attachment_number
    FROM attachments) attachments
    INNER JOIN posts
      ON posts.id = attachments.postId
        AND posts.userId = $1
        AND attachment_number = 1
    INNER JOIN users
      ON users.id = posts.userId
    ORDER BY posts.created_at DESC;
    `,
    [userId]
  );
};

exports.getUserFollowingPostsByUserId = async (dataFor) => {
  return await pool.query(
    `
    SELECT
      CAST(posts.id AS INT) AS "postId",
      attachments.filename AS "firstPostAttachment",
      users.user_name AS "userName",
      users.photo AS "userPhoto",
      CAST(attachments.id AS INT) AS "attachmentId",
      CAST(users.id AS INT) AS "userId"
    FROM (
      SELECT
      filename,
      postid,
      id,
      row_number() OVER (
        PARTITION BY
            postid
        ) AS attachment_number
    FROM attachments) attachments
    INNER JOIN posts
      ON posts.id = attachments.postId
        AND posts.userId ${dataFor}
        AND attachment_number = 1
    INNER JOIN users
      ON users.id = posts.userId
    ORDER BY posts.created_at DESC;
    `
  )
}

exports.getPostAttachmentsById = async (postId) => {
  return await pool.query(
    `
    SELECT 
      CAST(attachments.id AS INTEGER),
      attachments.postid,
      attachments.filename
    FROM attachments 
      INNER JOIN posts 
        ON attachments.postid = posts.id
        AND posts.id = $1;
    `,
    [postId]
  );
}

exports.getCommentsByPostId = async (postId) => {
  return await pool.query(
    `
    SELECT 
      post_comments.id,
      post_comments.comment
    FROM post_comments
    INNER JOIN posts
      ON posts.id = post_comments.postid
      AND posts.id = $1;
    `,
    [postId]
  );
}

exports.likePostByUserId = async (userId, postId) => {

  return await pool.query(
    `
    DO $$
    DECLARE
      userid int := ${userId};
      postid int:= ${postId};
    BEGIN
      IF NOT EXISTS (
        SELECT FROM likes
            WHERE user_id = userid AND post_id = postid
      ) THEN
          INSERT INTO likes
          (user_id, post_id)
          VALUES (userid, postid);
      ELSE
          DELETE FROM likes
          WHERE user_id = userid AND post_id = postid;
      END IF;
    END $$;
    `
  );
}

exports.getIdOfLikedPosts = async (postsIds, userId) => {
  const SQLarray = jsArrayToSQLArrayConverter(postsIds);

  return await pool.query(
    `SELECT
      (SELECT ARRAY(
        SELECT post_id
        FROM likes
        WHERE post_id IN ${SQLarray}
          AND user_id = ${userId})) AS liked_ids,
      (SELECT ARRAY(
        SELECT
          json_object_agg(
              posts.id,
              (SELECT COUNT(*) From likes Where post_id = posts.id)
          )
          FROM posts 
          WHERE posts.id IN ${SQLarray}
        ) AS number_of_likes
      )
    `
  )
}


exports.commentPostBuPostId = async (postId, comment, userId) => {
  return await pool.query(
    `
    INSERT INTO post_comments
      (postid, comment, user_id)
      VALUES($1, $2, $3)
    `,
    [postId, comment, userId]
  );
}

exports.getPostByPostId = async (postId) => {
  return await pool.query(
  `
  SELECT 
    CAST(users.id AS int) AS user_id,
    photo,
    user_name,
    CAST(post_comments.id AS int) AS comment_id,
    comment
  FROM post_comments
  INNER JOIN users
      ON post_comments.user_id = users.id
      AND postid = $1;
  `,
  [postId]
  )
}

exports.getLikeId = async (userId, postId) => {

  return await pool.query(
  `
  SELECT 
    likes.id
  FROM likes
  INNER JOIN users
    ON likes.user_id = users.id
    AND users.id = $1
    AND likes.post_id = $2;
  `,
  [userId, postId]
  )
}

exports.getPostInfo = async (userId, postId) => {
  return await pool.query(
    `
    SELECT
      (SELECT ARRAY[user_name, photo]
        FROM users 
        INNER JOIN posts
        ON users.id = posts.userid
      AND posts.id = ${postId}) as user_name,
      (SELECT ARRAY(SELECT filename FROM attachments WHERE postid = ${postId})) as fileNames,
      (SELECT ARRAY(
        SELECT ARRAY[comment , user_name , photo]
        FROM post_comments 
            INNER JOIN users
            ON users.id = post_comments.user_id
        WHERE postid = ${postId})) as comments
    `
  )
}

exports.getPostCreaterId = async (postId) => {
  return await pool.query(
    `
      SELECT userid
      FROM posts
        WHERE id = $1
    `,
    [postId]
  )
}

exports.delete = async (postId) => {
  return await pool.query(
    `
    BEGIN;
      DELETE FROM attachments WHERE postid = ${postId};
      DELETE FROM likes WHERE post_id = ${postId};
      DELETE FROM post_comments WHERE postid = ${postId};
      DELETE FROM posts WHERE id = ${postId};
    COMMIT;
    `
  )
}