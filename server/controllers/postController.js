const express = require('express');
const Post =require('../models/Post');


exports.createPost=async(req,res)=>{

    const {title,content,author,imageUrl}=req.body;
    try {
        const newPost =new Post({title,content,author,imageUrl});
        const savedPost =await newPost.save();
        res.status(201).json(savedPost);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

exports.latestPost=async(req,res)=>{
    try {
        const latestPosts=await Post.find().populate('author','name').sort({createdAt: -1});
        res.status(200).json(latestPosts)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
exports.popularPost=async(req,res)=>{
    try {
        const popularPosts = await Post.find().populate('author', 'name').sort({ likes: -1 })
        res.status(200).json(popularPosts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.likes=async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        await post.addLike();
        res.status(200).json({ message: 'Post liked', likes: post.likes });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}


exports.getPostsByAuthor = async (req, res) => {
    const { authorId } = req.params; // Extract authorId from the request parameters
  
    try {
      // Fetch posts where author matches the provided authorId
      const posts = await Post.find({ author: authorId }).sort({createdAt: -1});
      res.status(200).json(posts); // Send the posts as JSON with a 200 OK status
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ message: 'Server error, could not fetch posts' });
    }
  };