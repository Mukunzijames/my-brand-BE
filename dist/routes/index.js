"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_1 = __importDefault(require("../models/blog"));
const route = (0, express_1.Router)();
route.use("/blogs", blog_1.default);
// console.log('get')
exports.default = route;
