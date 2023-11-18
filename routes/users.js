const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      console.log(req.body.password);
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      console.log(error.message);
    }
  } else {
    res.status(404).json("you can only update your account");
  }
});
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await User.findByIdAndDelete(user);
        await Post.deleteMany({ email: user.email });
        res.status(200).json("user has been deleted");
      } catch (error) {
        console.log(error.message);
      }
    } catch (error) {
      res.status(404).json("User is not found here !");
    }
  } else {
    res.status(404).json("you can only update your account");
  }
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  res.status(200).json(user);
});
module.exports = router;
