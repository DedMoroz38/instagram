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

exports.uploadTourImages = upload.fields([
  {name: 'images', maxCount: 10}
]);


exports.resizeTourImages = catchAsync( async (req, res, next) => {
  if (!req.files.images) return next();
  // TODO - create an Error if no images
  // TODO - rename images to attachments if neede
  req.body.images = [];
  await Promise.all(
      req.files.images.map( async (file, i) => {
          // TODO - create image id
          const fileName = `image-${req.user.id}-${Date.now()}-${i + 1}.jpeg`;

          await sharp(file.buffer)
              .toFormat('jpeg')
              .jpeg({ quality: 90 })
              .toFile(`public/img/postImages/${fileName}`);
              
          req.body.images.push(fileName);
      })
  );
  next();
});

exports.createPost = catchAsync( async (req, res) => {
  // TODO - rename images to attachments if neede
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
  res.status(200).json({ 
    status: "success",
    posts: posts.rows
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