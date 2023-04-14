const catchAsync = require("./../utils/catchAsync");
const multer = require('multer');
const sharp = require("sharp");
const Posts = require('../models/postsModel');
const AppError = require('../utils/appErrors');

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

        if(file.mimetype.endsWith('gif')){
          const fileName = `image-${req.user.id}-${Date.now()}-${i + 1}.gif`;
          req.body.images.push(fileName);
          await sharp(file.buffer, {animated: true})
            .withMetadata() 
            .toFile(`public/img/postImages/${fileName}`);
        } else {
          const fileName = `image-${req.user.id}-${Date.now()}-${i + 1}.jpeg`;
          req.body.images.push(fileName);
          
          await sharp(file.buffer)
            .withMetadata() 
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/img/postImages/${fileName}`);
        }
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

const getPosts = async (res, dataFor, userId) => {
  const posts = await Posts.getUserFollowingPostsByUserId(dataFor);
  if (posts.rows.length > 0){
    const postsIds = posts.rows.map(post => {
      return post.postId;
    });
    
    let idOfLikedPosts = []
    if(postsIds.length > 0){
      idOfLikedPosts = await (await Posts.getIdOfLikedPosts(postsIds, userId)).rows;
    }

    const {liked_ids, number_of_likes} = idOfLikedPosts[0];

    res.status(200).json({ 
      status: "success",
      posts: posts.rows,
      idOfLikedPosts: liked_ids,
      numberOfLikes: number_of_likes
    });
  } else {
    res.status(200).json({ 
      status: "success",
    });
  }
}

exports.getPosts = catchAsync( async (req, res) => {
  const userId = req.user.id;
  const {isForUser} = req.params;
  let dataFor;
  if (isForUser === 'true'){
    dataFor = `= ${userId}`
  } else {
    dataFor = `IN (SELECT getter FROM subscriptions WHERE sender = ${userId})`
  }

  getPosts(res, dataFor, userId);
});

exports.getPostsForAccount = catchAsync(async (req, res) => {
  const {userId} = req.params;
  getPosts(res, `= ${userId}`, req.user.id);
})

exports.getAttachmentsForPost = catchAsync( async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.postId;
  
  const post = await Posts.getPostInfo(userId, postId);
  const {
    user_name,
    filenames,
    comments,
  } = post.rows[0];

  res.status(200).json({
    status: 'success',
    userName: user_name,
    postAttachments: filenames,
    postComments: comments,
  });
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

exports.delete = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const postId = +req.params.postId
  const postCreatorId = await Posts.getPostCreaterId(postId);
  if(userId == postCreatorId.rows[0].userid){
    await Posts.delete(postId)
  } else {
    return next(new AppError("Can't delete this post", 400));
  }
  res.status(200).json({
    status: 'success'
  })
})

