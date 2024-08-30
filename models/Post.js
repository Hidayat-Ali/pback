const mongoose = require("mongoose");
const Comment = require("../models/comment");
const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    dec: {
      type: String,
      unique: true,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", postSchema);
