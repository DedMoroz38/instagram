const express = require("express");
const authController = require("../controllers/authController.js");
const friendsRoutes = require("../controllers/friendsController.js");

const router = express.Router();

router.use(authController.protect);

router.post('/getAccount', friendsRoutes.getAccount);
router.post('/follow', friendsRoutes.addFriend);
router.get('/getFollowings', friendsRoutes.getFollowings);

module.exports = router;