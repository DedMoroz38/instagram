const multer = require("multer");
const sharp = require("sharp");
const catchAsync = require("./../utils/catchAsync");
const User = require("../models/userModel");
const factory = require("./handlerFactory");


const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')){
        cb(null, true);
    } else {
        cb(new AppError("Not an image! Please upload only images!", 400), false);
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync( async (req, res, next) => {
  if(!req.file) return next();
  const id = req.user.rows[0].id
  req.file.filename = `user-${id}-${Date.now()}.jpeg`;
  
  await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${req.file.filename}`);
  next();
});

exports.updateUser = catchAsync( async (req, res, next) => {
  const filteredBody = {};
  // const filteredBody = filterObj(req.body, "name", "login");
  const user = req.user.rows[0];
  if (req.file) filteredBody.photo = req.file.filename;
  const result = await User.findByIdAndUpdate(user.id, filteredBody);
  
  res.status(200).json({
    status: 'success',
    user: filteredBody
  });
});

exports.getMe = catchAsync( async (req, res, next) => {
  const data = req.user.rows[0];
  console.log(data);
  data.password = null;
  data.password_confirm = null;

  res.status(200).json({
    status: "success",
    data: req.user.rows[0]
  });
});

exports.addFriend = catchAsync( async (req, res, next) => {
  const friendUName = req.body.friendName;
  const result = await User.addToFriends(req.user.id, friendUName);

  res.status(200).json({
    status: "success",
    data: result
  });
});


exports.getFriend = catchAsync( async (req, res, next) => {
  const friendName = req.body.friendName;
  const friend = await (await User.getFriendByName(friendName)).rows[0];

  res.status(200).json({
    status: "success",
    friend
  });
});
