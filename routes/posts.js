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
router.get("/:title", async (req, res) => {
  // const post = await Post.findOne(req.params.title);
  // res.status(200).json(post);

  try {
    const encodedTitle = req.params.title;
    const decodedTitle = decodeURIComponent(encodedTitle);

    // Query the database for the post with the decoded title
    const post = await Post.findOne({ title: decodedTitle });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Return the post as JSON
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
