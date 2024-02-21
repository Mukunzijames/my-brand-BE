"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_1 = require("../controllers/blog");
const multer_1 = __importDefault(require("../helper/multer"));
const blogRouter = (0, express_1.Router)();
blogRouter.post('/', multer_1.default.single('image'), blog_1.createPost);
blogRouter.get('/:id', blog_1.getPost);
blogRouter.get('/', blog_1.getAllPost);
blogRouter.patch('/:id', blog_1.updatePost);
blogRouter.delete('/:id', blog_1.deletePost);
blogRouter.post("/:id/likes", blog_1.Likes);
blogRouter.post("/:id", blog_1.unLikes);
exports.default = blogRouter;
