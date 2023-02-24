const catchAsync = require("./../utils/catchAsync");
const multer = require('multer');
const sharp = require("sharp");
const Posts = require('../models/postsModel');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    cb(null, true);
    // TODO - check if file is there!
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadPostImages = upload.fields([
  {name: 'images', maxCount: 10}
]);




exports.resizePostImages = catchAsync( async (req, res, next) => {
  if (!req.files.images) return next();
  // TODO - create an Error if no images
  // TODO - rename images to attachments if needed
  req.body.images = [];
  await Promise.all(
      req.files.images.map( async (file, i) => {
          // TODO - create image id
          const fileName = `image-${req.user.id}-${Date.now()}-${i + 1}.jpeg`;
          req.body.images.push(fileName);
          
          await sharp(file.buffer)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/img/postImages/${fileName}`);
      })
  );
  next();
});

exports.createPost = catchAsync( async (req, res) => {
  // TODO - rename images to attachments if needed
  const attachments = req.body.images;
  const userId = req.user.id;
  await Posts.createPostForUserId(userId, attachments);

  res.status(200).json({ 
    status: "success"
  });
});

exports.getUserPosts = catchAsync( async (req, res) => {
  const userId = req.user.id;
  const posts = await Posts.getPostsByUserId(userId);
  res.status(200).json({ 
    status: "success",
    posts: posts.rows
  });
});

exports.getUserFollowingPosts = catchAsync( async (req, res) => {
  const userId = req.user.id;
  const posts = await Posts.getUserFollowingPostsByUserId(userId);
  const postsIds = posts.rows.map(post => {
    return post.postId;
  });
  
  let idOfLikedPosts = []
  if(postsIds.length > 0){
    idOfLikedPosts = await (await Posts.getIdOfLikedPosts(postsIds, userId)).rows;
  }

  res.status(200).json({ 
    status: "success",
    posts: posts.rows,
    idOfLikedPosts: idOfLikedPosts
  });
});

exports.getAttachmentsForPost = catchAsync( async (req, res) => {
  const postId = req.params.postId;
  const postAttachments = await Posts.getPostAttachmentsById(postId);
  const postComments = await Posts.getCommentsByPostId(postId);

  res.status(200).json({
    status: 'success',
    postAttachments: postAttachments.rows,
    postComments: postComments.rows
  })
}); 

exports.like = catchAsync( async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.postId;

  await Posts.likePostByUserId(userId, postId);
  res.status(200).json({
    status: 'success'
  })
});

exports.comment = catchAsync( async (req, res) => {
  const postId = req.params.postId;
  const comment = req.body.comment;
  const userId = req.user.id;

  await Posts.commentPostBuPostId(postId, comment, userId);
  res.status(200).json({
    status: 'success'
  })
});

exports.getComments = catchAsync( async(req, res) => {
  const postId = req.params.postId;

  comments = await Posts.getPostByPostId(postId)
  res.status(200).json({
    status: 'success',
    comments: comments.rows
  })
});