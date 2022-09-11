const pool = require('../db');

exports.createPostForUserId = async (userId, postOfImages) => {
  return await pool.query(
    `INSERT INTO posts 
     (userId, images)
     VALUES($1,ARRAY [$2]);`,
    [userId, postOfImages]
  );
};

exports.getPostsbyUserId = async (userId) => {
  return await pool.query(
    `SELECT * FROM posts
     WHERE userId = $1;
    `,
    [userId]
  );
};