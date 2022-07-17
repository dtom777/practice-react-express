const Post = require("../models/Post");

const postController = {
  async create(req, res) {
    console.log("BODY", req.body);
    const newPost = new Post(req.body);
    console.log(newPost);
    try {
      const savedPost = await newPost.save();
      return res.status(200).json(savedPost);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  async update(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      await post.updateOne({
        $set: req.body,
      });
      return res.status(200).json("編集成功！");
    } catch (error) {
      return res.status(403).json(error);
    }
  },

  async delete(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      await post.deleteOne();
      return res.status(200).json("削除成功！");
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  async get(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  async getList(req, res) {
    try {
      const post = await Post.find();
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = postController;
