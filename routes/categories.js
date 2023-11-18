const router = require("express").Router();
const Category = require("../models/Category");
router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  console.log(req.body);
  try {
    await newCat.save();
    res.status(200).json({ message: "succesfully added category" });
  } catch (error) {
    res.status(404).json(error);
  }
});
router.get("/all-categories", async (req, res) => {
  try {
    const all_categories = await Category.find();
    res.status(200).json(all_categories);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
