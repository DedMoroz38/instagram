const express = require("express");
const authController = require("../controllers/authController.js");
const friendsRoutes = require("../controllers/friendsController.js");

const router = express.Router();

router.use(authController.protect);

router.get('/getAccounts/:query/:groupNumber', friendsRoutes.getAccounts);
router.get('/follow/:userId', friendsRoutes.followUser);
router.get('/getFollowings', friendsRoutes.getFollowings);

module.exports = router;