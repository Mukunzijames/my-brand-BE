"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_1 = __importDefault(require("./blog"));
const message_1 = __importDefault(require("./message"));
const comment_1 = __importDefault(require("./comment"));
const user_1 = __importDefault(require("./user"));
const route = (0, express_1.Router)();
route.use("/blogs", blog_1.default);
route.use("/messages", message_1.default);
route.use("/auth", user_1.default);
route.use("/blogs", comment_1.default);
exports.default = route;
