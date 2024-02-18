"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_1 = require("../controllers/blog");
const route = (0, express_1.default)();
// console.log('get')
route.post('/blogs', blog_1.createPost);
route.get('/blogs/:id', blog_1.getPost);
route.get('/blogs', blog_1.getAllPost);
route.patch('/blogs/:id', blog_1.updatePost);
route.delete('/blogs/:id', blog_1.deletePost);
exports.default = route;
