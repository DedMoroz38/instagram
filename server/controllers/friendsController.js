const multer = require("multer");
const sharp = require("sharp");
const catchAsync = require("./../utils/catchAsync");
const User = require("../models/userModel");
const factory = require("./handlerFactory");
// const { subscribe } = require("../routes/friendsRoutes");

exports.getAccounts = catchAsync( async (req, res) => {
  const {query, groupNumber} = req.params;

  const users = await User.getUserByNameOrUserName(query, groupNumber);
  const idsOfSubscribedUsers = await User.getIdOfSubscribedUsers(query, req.user.id)

  res.status(200).json({
    status: "success",
    users: users.rows,
    subscribedIds: idsOfSubscribedUsers.rows.map(id => id.id)
  });
});

exports.followUser = catchAsync( async (req, res) => {
  const accountUserId = req.params.userId;
  await User.subscribeToUser(req.user.id, accountUserId);

  res.status(200).json({
    status: "success",
  });
});

exports.getFollowings = catchAsync( async (req, res) => {
  let friends = await User.getFriendsByUserId(req.user.id);
  friends = friends.rows;

  res.status(200).json({
    status: "success",
    friends
  });
})