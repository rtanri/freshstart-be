const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Posts = require("../models/posts");
const checkAuth = require("../middleware/check-auth");
const User = require("../models/user");

router.post("/api/v1/posts", checkAuth, async (req, res) => {
  try {
    const posts = new Posts({
      user: req.userData.userId,
      context: req.body.context,
      username: req.userData.username,
      comments: req.body.comment_id,
    });
    const newPosts = await posts.save();
    console.log("==newPosts==");
    console.log(newPosts);
    res.statusCode = 201;
    res.json(newPosts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.get("/api/v1/posts", checkAuth, async (req, res) => {
//   try {
//     const returnUser = await User.findOne({
//       username: req.userData.username,
//     });
//     const returnPosts = await Posts.find({
//       user: returnUser._id,
//     }).populate("user");
//     res.json(returnPosts);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// get post limit by 3 post
router.get("/api/v1/posts", async (req, res) => {
  try {
    const returnPosts = await Posts.find().sort({ createdAt: -1 }).limit(3);
    res.statusCode = 201;
    res.json(returnPosts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
