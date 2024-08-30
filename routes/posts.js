const router = require("express").Router();
const Post = require("../models/Post");
const Comment = require("../models/comment");

// Add a comment to a specific post by post title
router.post("/:title/comment", async (req, res) => {
  console.log("this route is being tried to access the comment");
  try {
    // Find post by title
    const encodedTitle = req.params.title;
    const decodedTitle = decodeURIComponent(encodedTitle);
    const post = await Post.findOne({ title: decodedTitle });
    console.log(post);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const { userName, email, message } = req.body;
    if (!userName || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userComment = new Comment({ userName, email, message });
    await userComment.save();

    post.comments.push(userComment._id);
    await post.save();

    return res.status(200).json({ message: "Commented successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Add a new post
router.post("/", async (req, res) => {
  const post = new Post(req.body);
  try {
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Delete a post by ID
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.email !== req.body.email) {
      return res
        .status(403)
        .json({ message: "You can only delete your own post" });
    }

    await Post.findByIdAndDelete(req.params.id); // Corrected deletion line
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Get a specific post by title
router.get("/:title", async (req, res) => {
  try {
    const encodedTitle = req.params.title;
    const decodedTitle = decodeURIComponent(encodedTitle);
    const post = await Post.findOne({ title: decodedTitle }).populate(
      "comments"
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Get all posts, optionally filtering by username or category
router.get("/", async (req, res) => {
  try {
    const username = req.query.username; // Changed from req.body to req.query
    const catName = req.query.cat; // Changed from req.body to req.query
    let posts;

    if (username) {
      posts = await Post.find({ username: username }); // Corrected find method usage
    } else if (catName) {
      posts = await Post.find({
        categories: { $in: [catName] },
      });
    } else {
      posts = await Post.find({});
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

module.exports = router;
