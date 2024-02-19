import {Comment}  from '../models/comment';
import Post from '../models/blog';
import { Request, Response } from 'express';

//  see comments 
const commentShow = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.id;
        const blog = await Post.findOne({ _id: blogId });
        if (!blog) {
            return res.status(404).send({ error: "Comment not found" });
        }
        const comments = await Comment.find({ blog: blogId });
        res.send(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).send({ error: "Internal server error" });
    }
}
// Comment Post
const commentPost = async (req: Request, res: Response) => {
    try {
        const { name, email, commentSent} = req.body;
        const blogId = req.params.id;
        const blog = await Post.findOne({ _id: blogId });
        if (!blog) {
            return res.status(404).send({ error: "blog not found" });
        }
        const newComment = new Comment({
            name,
            email,
            commentSent, 
            blog: blog._id
        });
        await newComment.save();
        res.status(201).send(newComment);
    } catch (error) {
        console.error("Error posting comment:", error);
        res.status(500).send({ error: "Internal server error" });
    }
}
export { commentPost, commentShow};

