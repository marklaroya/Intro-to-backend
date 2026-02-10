import { Post } from "../models/post.model.js";

const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;

    // basic validation for the fields
    if (!name || !description || age === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const post = await Post.create({
      name,
      description,
      age,
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

const getPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

const updatePost = async (req, res) => {
  try {
    // check if the post exists
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No data provided for update" });
    }

    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return res.status(404).json({ message: "Post does not exist" });
    }

    res.status(200).json({
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post does not exist" });
    }

    res.status(200).json({
      message: "Post deleted successfully",
      deletedPost,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

export { createPost, getPost, updatePost, deletePost };
