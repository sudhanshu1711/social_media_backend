import { Post } from "../Models/post.models.js";

const createPost = async (req, res) => {
    const newPost = new Post(req.body);
  
    try {
      await newPost.save();
      res.status(200).json("Post created!");
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
 const getPost = async (req, res) => {
    const id = req.params.id;
  
    try {
      const post = await Post.findById(id);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  };

 const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    try {
      const post = await Post.findById(postId);
      if (post.userId === userId) {
        await post.updateOne({ $set: req.body });
        res.status(200).json("Post Updated");
      } else {
        res.status(403).json("Action forbidden");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };

 const deletePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
  
    try {
      const post = await Post.findById(id);
      if (post.userId === userId) {
        await post.deleteOne();
        res.status(200).json("POst deleted successfully");
      } else {
        res.status(403).json("Action forbidden");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };
 const likePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
  
    try {
      const post = await Post.findById(id);
      if (!post.likes.includes(userId)) {
        await post.updateOne({ $push: { likes: userId } });
        res.status(200).json("Post liked");
      } else {
        await post.updateOne({ $pull: { likes: userId } });
        res.status(200).json("Post Unliked");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };

  export {createPost,getPost,deletePost,updatePost,likePost}
  