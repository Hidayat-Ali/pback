const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
// REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

// LOGIN REQUEST
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("wrong credentials");
    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(404).json("wrong credentials");
    res.status(200).json({ message: "login successful" });
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
