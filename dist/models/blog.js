"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { number } from "joi";
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
    },
    image: {
        type: String,
        required: false
    },
    like: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('Post', PostSchema);
