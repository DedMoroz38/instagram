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

  req.body.images = [];
  await Promise.all(
      req.files.images.map( async (file, i) => {
          // TODO - create image id
          const fileName = `image-12313-${Date.now()}-${i + 1}.jpeg`;

          await sharp(file.buffer)
              .resize(500, 500)
              .toFormat('jpeg')
              .jpeg({ quality: 90 })
              .toFile(`public/img/postImages/${fileName}`);
              
          req.body.images.push(fileName);
      })
  );
  next();
});

exports.createPost = catchAsync( async (req, res) => {
  const postOfImages = req.body.images;
  const userId = req.user.id;
  await Posts.createPostForUserId(userId, postOfImages);

  res.status(200).json({ 
    status: "success"
  });
});

exports.getPosts = catchAsync( async (req, res) => {
  const userId = req.user.id;
  const posts = await (await Posts.getPostsbyUserId(userId)).rows[0];

  res.status(200).json({ 
    status: "success",
    posts
  });
});