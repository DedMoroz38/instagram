const express = require("express");
const authController = require("../controllers/authController.js");
const postsController = require("../controllers/postsController.js");


const router = express.Router();


router.use(authController.protect);

router.route('/')
  .get(postsController.getUserPosts)
  .post(postsController.uploadPostImages,
        postsController.resizePostImages,
        postsController.createPost);

router.route('/delete/:postId')
    .get(postsController.delete)

router.route('/:isForUser')
  .get(postsController.getPosts);

router.route('/getByUserId/:userId')
  .get(postsController.getPostsForAccount);

router.route('/getAttachmentsForPost/:postId')
  .get(postsController.getAttachmentsForPost);

router.route('/like/:postId')
  .get(postsController.like);

router.route('/comment/:postId')
  .post(postsController.comment)



module.exports = router;