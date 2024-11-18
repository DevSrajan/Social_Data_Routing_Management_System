const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// View All Posts with Pagination
router.get("/", async (req, res) => {
  const perPage = 15; // Number of posts per page
  const page = parseInt(req.query.page) || 1; // Current page number, default is 1

  try {
    // Fetch posts with pagination logic
    const posts = await Post.find()
      .skip((perPage * page) - perPage)  // Skip posts based on the page number
      .limit(perPage); // Limit to the specified number of posts per page

    // Get total number of posts
    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage); // Calculate the total number of pages

    // Render the posts page with pagination variables
    res.render("posts", {
      posts,
      currentPage: page, // Current page number
      totalPages: totalPages, // Total pages
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Edit Post Page (GET request)
router.get("/edit/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.render("edit", { post });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Edit Post (POST request)
router.post("/edit/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        body: req.body.body,
      },
      { new: true }
    );
    res.redirect("/posts");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating post");
  }
});

// Create New Post Page (GET request)
router.get("/new", (req, res) => {
  res.render("new");
});

// Create New Post (POST request)
router.post("/new", async (req, res) => {
  try {
    const newPost = await Post.create({ title: req.body.title, body: req.body.body });
    res.redirect("/posts");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating new post");
  }
});

// Delete Post (POST request)
router.post("/delete/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect("/posts");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting post");
  }
});

module.exports = router;
