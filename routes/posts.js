const router = require("express").Router();
const Post = require("../models/Post");
router.post("/", async (req, res) => {
  const post = new Post(req.body);
  try {
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});
router.delete("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.email === req.body.email) {
    try {
      await Post.findById(req.body.email);
      res.status(200).json("deleted successfully");
    } catch (error) {
      res.status(404).send(error);
    }
  } else {
    console.log("you can delete  your post only ");
  }
});
// get all post from here
router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.status(200).json(post);
});

router.get("/", async (req, res) => {
  let posts;
  const username = req.body.username;
  const catName = req.body.cat;
  try {
    if (username) {
      posts = await Post.findById({ username: username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
      res.status(200).json({ posts });
    } else {
      posts = await Post.find({});
      res.status(200).json(posts);
    }
    // res.status(200).json(posts);
  } catch (error) {
    res.status(404).json(error);
  }
});
module.exports = router;
