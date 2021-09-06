const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const Comments = require("../models/comments");
const Posts = require("../models/posts");

router.post("/api/v1/comments/:postId", checkAuth, async (req, res) => {
  try {
    const comments = new Comments({
      postId: req.params.postId,
      context: req.body.context,
      userId: req.userData.userId,
      username: req.userData.username,
    });
    const newComments = await comments.save();
    console.log("==newComments==");
    console.log(newComments);

    const savedComment = await Posts.updateOne(
      {
        _id: req.params.postId,
      },
      { $push: { comments: newComments._id } }
    );
    console.log(2);
    console.log(savedComment);
    res.status(201).json({
      message: "created comment successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/api/v1/comments/:postId", async (req, res) => {
  try {
    console.log(req.params.postId);
    const returnComments = await Comments.find({
      postId: req.params.postId,
    });
    res.json(returnComments);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
