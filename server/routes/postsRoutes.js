const express = require("express");
const authController = require("../controllers/authController.js");
const postsController = require("../controllers/postsController.js");


const router = express.Router();


router.use(authController.protect);

router.route('/')
  .get(postsController.getUserPosts)
  .post(postsController.uploadTourImages,
        postsController.resizeTourImages,
        postsController.createPost);
router.route('/getUserFollowingPosts')
  .get(postsController.getUserFollowingPosts)


module.exports = router;