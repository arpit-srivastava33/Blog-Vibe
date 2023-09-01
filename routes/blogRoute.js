const express = require("express");
const { allBlogController, createBlogController, updateController, deleteController, getBlogByIdController, userBlogController } = require("../controllers/blogController");
const router = express.Router();

// GET all blog
router.get("/allBlogs", allBlogController);

// POST / create blog
router.post("/createBlog", createBlogController);

//PUT /update blog
router.put("/updateBlog/:id", updateController);

//Delete blog
router.delete("/deleteBlog/:id", deleteController);

// Get single blog
router.get("/getBlog/:id", getBlogByIdController);

// Get user blog
router.get("/userBlog/:id", userBlogController)

module.exports = router