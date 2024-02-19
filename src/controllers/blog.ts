import { Request ,Response } from "express";
import cloudinary from "../helper/cloudinary";

import Post, { Ipost } from "../models/blog"

//Create post
const createPost = async(req:Request,res:Response)=>{
  try{
    const { title, desc } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided'});
    }
    const existingPost = await Post.findOne({ title });
    if (existingPost) {
      return res.status(400).json({ error: 'Title already exists' });
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    const post = await Post.create({
      title,
      desc,
      image: result.secure_url
    });
    return res.status(201).json(post)
    }
    catch(e){
      return res.status(500).json()
    }
}
//get post
const getPost= async (req:Request,res:Response) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
}
//update post
const updatePost=async(req:Request,res:Response)=>{
  try {
    const post=await Post.findById(req.params.id);
    const updated = await Post.findByIdAndUpdate(req.params.id,{$set:{
        title:req.body.title, 
        desc:req.body.desc,
        image:req.body.image,
      }},{new:true});
      res.status(200).json({
        status:"success",
        data:updated
      });
    } catch (error) {
        res.status(500).json({status:"error", error: 'hello' });
      }
}
//delete post
const deletePost=async(req:Request,res:Response)=>{
    try {
        const post = await Post.findById(req.params.id);
          try {
            if (post){
               await post.deleteOne();
            }   
            res.status(200).json("Post has been deleted...");
          } catch (err) {
            res.status(500).json(err);
          }
      } catch (err) {
        res.status(500).json(err);
      }  
}
//const get all posts
const getAllPost=async(req:Request,res:Response)=>{
    const username = req.query.user;
    try {
      let posts;
        posts = await Post.find();
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
}
const Likes=async(req:Request,res:Response)=>{
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json({ message: "No blog post with the given ID found" });
    }

    await Post.updateOne({ _id: post._id }, { $inc: { like: 1 } });

    res.status(200).json({ message: 'Post liked successfully' });
} catch (error) {
    res.status(500).json({ error: (error as Error).message });
}
}
const unLikes=async(req:Request,res:Response)=>{
  try {
    const postId = req.params.id;

    const post = await Post.findOne({ _id: postId });

    if (!post) {
        return res.status(404).json({ message: "No blog post with the given ID found" });
    }

    await Post.updateOne({ _id: post._id }, { $inc: { like: -1 } });

    res.status(200).json({ message: 'Post unliked successfully' });
} catch (error) {
    res.status(500).json({ error: (error as Error).message });
}
}

export  {createPost,getAllPost,getPost,updatePost,deletePost,Likes,unLikes}
