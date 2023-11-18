const mongoose = require("mongoose");
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
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", postSchema);
