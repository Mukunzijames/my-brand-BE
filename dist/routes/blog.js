"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_1 = require("../middleware/blog");
const blog_2 = require("../controllers/blog");
const multer_1 = __importDefault(require("../helper/multer"));
const blogRouter = (0, express_1.Router)();
blogRouter.post('/', blog_1.BlogValidate, multer_1.default.single('image'), blog_2.createPost);
blogRouter.get('/:id', blog_2.getPost);
blogRouter.get('/', blog_2.getAllPost);
blogRouter.patch('/:id', blog_2.updatePost);
blogRouter.delete('/:id', blog_2.deletePost);
blogRouter.post("/:id/likes", blog_2.Likes);
blogRouter.post("/:id", blog_2.unLikes);
exports.default = blogRouter;
