"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unLikes = exports.Likes = exports.deletePost = exports.updatePost = exports.getPost = exports.getAllPost = exports.createPost = void 0;
const cloudinary_1 = __importDefault(require("../helper/cloudinary"));
const blog_1 = __importDefault(require("../models/blog"));
const validation_1 = require("../utils/validation");
//Create post
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = validation_1.postSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        const { title, desc } = value;
        if (!req.file) {
            return res.status(400).json({ error: 'No file provided' });
        }
        const existingPost = yield blog_1.default.findOne({ title });
        if (existingPost) {
            return res.status(400).json({ error: 'Title already exists' });
        }
        const result = yield cloudinary_1.default.uploader.upload(req.file.path);
        const post = yield blog_1.default.create({
            title,
            desc,
            image: result.secure_url
        });
        return res.status(201).json(post);
    }
    catch (e) {
        return res.status(500).json();
    }
});
exports.createPost = createPost;
//get post
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield blog_1.default.findById(req.params.id);
        res.status(200).json(post);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getPost = getPost;
//update post
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield blog_1.default.findById(req.params.id);
        const updated = yield blog_1.default.findByIdAndUpdate(req.params.id, { $set: {
                title: req.body.title,
                desc: req.body.desc,
                image: req.body.image,
            } }, { new: true });
        res.status(200).json({
            status: "success",
            data: updated
        });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: 'hello' });
    }
});
exports.updatePost = updatePost;
//delete post
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield blog_1.default.findById(req.params.id);
        try {
            if (post) {
                yield post.deleteOne();
            }
            res.status(200).json("Post has been deleted...");
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.deletePost = deletePost;
//const get all posts
const getAllPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.query.user;
    try {
        let posts;
        posts = yield blog_1.default.find();
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getAllPost = getAllPost;
const Likes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const post = yield blog_1.default.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "No blog post with the given ID found" });
        }
        yield blog_1.default.updateOne({ _id: post._id }, { $inc: { like: 1 } });
        res.status(200).json({ message: 'Post liked successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.Likes = Likes;
const unLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const post = yield blog_1.default.findOne({ _id: postId });
        if (!post) {
            return res.status(404).json({ message: "No blog post with the given ID found" });
        }
        yield blog_1.default.updateOne({ _id: post._id }, { $inc: { like: -1 } });
        res.status(200).json({ message: 'Post unliked successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.unLikes = unLikes;
