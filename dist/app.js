"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const blog_1 = __importDefault(require("./routes/blog"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const mongoUrl = process.env.MONGODB_URL;
const port = process.env.PORT;
mongoose_1.default.connect(mongoUrl)
    .then(() => {
    app.use(express_1.default.json());
    app.use("/api", blog_1.default);
    console.log(`MongoDB connected`);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch(err => {
    console.error("Error connecting to MongoDB:", err);
});
exports.default = app;
