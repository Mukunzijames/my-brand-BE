"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_1 = require("../controllers/blog");
const route = (0, express_1.Router)();
route.post('/blog', blog_1.createPost);
route.get('/blog/:id', blog_1.getPost);
exports.default = route;
