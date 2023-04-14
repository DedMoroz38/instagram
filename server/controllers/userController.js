const multer = require("multer");
const sharp = require("sharp");
const catchAsync = require("./../utils/catchAsync");
const User = require("../models/userModel");
const factory = require("./handlerFactory");
const Email = require("../utils/emailSender");

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
  const id = req.user.id;
  // req.file.filename = `user-${id}-${Date.now()}.jpeg`;

  if(req.file.mimetype.endsWith('gif')){
    req.file.filename = `user-${id}-${Date.now()}.gif`;

    await sharp(req.file.buffer, {animated: true})
      .withMetadata() 
      .resize(500, 500)
      .toFile(`public/img/users/${req.file.filename}`);
  } else {
    req.file.filename = `user-${id}-${Date.now()}.jpeg`;
  
    await sharp(req.file.buffer)
        .withMetadata() 
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/users/${req.file.filename}`);
  }
  next();
});

exports.updateUser = catchAsync( async (req, res, next) => {
  const filteredBody = {};
  // const filteredBody = filterObj(req.body, "name", "login");
  const user = req.user
  if (req.file) filteredBody.photo = req.file.filename;
  await User.findByIdAndUpdate(user.id, filteredBody);
  
  res.status(200).json({
    status: 'success',
    user: filteredBody
  });
});

exports.getMe = catchAsync( async (req, res, next) => {
  const data = req.user
  data.password = null;
  data.password_confirm = null;

  res.status(200).json({
    status: "success",
    data
  });
});

exports.resendLoginConfirmationEmail = catchAsync( async (req, res, next) => {
  const user = req.body.user;
  const url = `${req.protocol}://${req.get('host')}/api/v1/users/submitEmail/${user.id}`;
  await new Email(user, url).sendWelcome();
  res.status(200).json({
    status: "success"
  })
})

exports.submitEmail = catchAsync( async (req, res, next) => {
  const userId = req.params.userId;

  await User.submitEmailByUserId(userId);
  res.writeHead(301 ,{Location: `${req.protocol}://${process.env.IP}:3000`});
  res.end();
}); 

exports.getProfileInfo = catchAsync( async (req, res) => {
  let userId;
  if(req.params.userId !== undefined){

    userId = req.params.userId;
  } else {
    userId = req.user.id;
  }

  const profileInfo = await User.getProfileInfoById(userId);
  res.status(200).json({
    status: "success",
    profileInfo: profileInfo.rows[0]
  })
})

exports.getUserInfo = catchAsync( async (req, res) => {
  const userId = req.params.userId;
  let profileInfo = await User.findById(userId);
  profileInfo = profileInfo.rows[0];

  res.status(200).json({
    status: "success",
    profileInfo: {
      name: profileInfo.full_name,
      login: profileInfo.login,
      user_name: profileInfo.user_name,
      photo: profileInfo.photo,
      id: profileInfo.id
    }
  })
})


