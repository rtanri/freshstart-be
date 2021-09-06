const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "posts",
  },
  context: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "myuser",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  username: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("comment", commentSchema);
