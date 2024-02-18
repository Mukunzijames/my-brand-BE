import { Request ,Response } from "express";

import Post from "../models/blog"


const { default: mongoose } = require("mongoose");
//Create post
const createPost=async(req:Request,res:Response)=>{
  try{
        const post=await Post.create({
          title:req.body.title,
          desc:req.body.desc,
          image:req.body.image
        });
        res.status(201).json(post)
    }
    catch(e){
        res.status(500).json(e)
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
// const deletePost=async(req:Request,res:Response)=>{
//     try {
//         const post = await Post.findById(req.params.id);
//         if (post.username === req.body.username) {
//           try {
//             await post.delete();
//             res.status(200).json("Post has been deleted...");
//           } catch (err) {
//             res.status(500).json(err);
//           }
//         } else {
//           res.status(401).json("You can delete only your post");
//         }
//       } catch (err) {
//         res.status(500).json(err);
//       }  
// }
//const get all posts
const getAllPost=async(req:Request,res:Response)=>{
    const username = req.query.user;
    try {
      let posts;
      if (username) {
        posts = await Post.find({ username });
      } else {
        posts = await Post.find().populate('comments');
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
}

export  {createPost,getAllPost,getPost,updatePost}
