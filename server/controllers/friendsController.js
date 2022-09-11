const multer = require("multer");
const sharp = require("sharp");
const catchAsync = require("./../utils/catchAsync");
const User = require("../models/userModel");
const factory = require("./handlerFactory");

exports.getAccount = catchAsync( async (req, res, next) => {
  const friendName = req.body.friendName;
  const friend = await (await User.getFriendByName(friendName)).rows[0];

  res.status(200).json({
    status: "success",
    friend
  });
});

exports.addFriend = catchAsync( async (req, res) => {
  const friendUName = req.body.friendUName;
  const result = await User.addToFriends(req.user.id, friendUName);

  res.status(200).json({
    status: "success",
    data: result
  });
});

exports.getFollowings = catchAsync( async (req, res) => {
  const friends = await (await User.getFriendsByUserId(req.user.id)).rows;

  res.status(200).json({
    status: "success",
    friends
  });
})