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
const globals_1 = require("@jest/globals");
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("../src/app"));
const blog_1 = __importDefault(require("../src/models/blog"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_url = process.env.MONGODB_TEST_URI || '';
(0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect("mongodb+srv://jimmy:jimmy123@jimmy.pxitdka.mongodb.net/?retryWrites=true&w=majority&appName=jimmy");
    //await mongoose.createConnection(DB_URL2);
}), 50000);
(0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
// afterEach(async () => {
//    await clearDatabase();
//  });
//  const clearDatabase = async () => {
//    const collections = mongoose.connection.collections;
//    for (const key in collections) {
//      const collection = collections[key];
//      await collection.deleteMany({});
//    }
//  };
let token = '';
let ids = '';
(0, globals_1.describe)('Auth Testing', () => {
    (0, globals_1.it)('should register user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).post('/api/users/register').send({
            username: "avierra123",
            email: "patrick2345@gmail.com",
            password: "richard1235ji"
        });
        (0, globals_1.expect)(res.status).toBe(200);
    }));
    (0, globals_1.it)('should register user and login', () => __awaiter(void 0, void 0, void 0, function* () {
        let r = (Math.random() + 1).toString(36).substring(5);
        const res = yield (0, supertest_1.default)(app_1.default).post('/api/users/register').send({
            username: "james" + r,
            email: r + "james@gmail.com",
            password: "james12345"
        });
        (0, globals_1.expect)(res.body.message).toContain('register successful');
        const resLogin = yield (0, supertest_1.default)(app_1.default).post('/api/users/login').send({
            email: "patrick2345@gmail.com",
            password: "richard1235ji"
        });
        (0, globals_1.expect)(resLogin.statusCode).toBe(200);
        token = resLogin.body.token;
    }));
    (0, globals_1.it)('should return 500 user not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const resLogin = yield (0, supertest_1.default)(app_1.default).post('/api/users/login').send({
            email: "edwin@.com",
            password: "richard123"
        });
        (0, globals_1.expect)(resLogin.statusCode).toBe(500);
    }));
    let blogId = '';
    (0, globals_1.describe)('Blog Testing', () => {
        const images = [
            './images/image1.jpg'
        ];
        let r = (Math.random() + 1).toString(36).substring(5);
        let blogs = { title: "this blog is final hh 2324" + r,
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            image: "image.png" };
        (0, globals_1.it)('getting All posts/blogs', () => __awaiter(void 0, void 0, void 0, function* () {
            const blog = yield blog_1.default.create(blogs);
            const response = yield (0, supertest_1.default)(app_1.default).get('/api/blogs');
            (0, globals_1.expect)(response.status).toBe(200);
        }));
        (0, globals_1.it)('get a single posts/blogs', () => __awaiter(void 0, void 0, void 0, function* () {
            const response1 = yield (0, supertest_1.default)(app_1.default).get('/api/blogs');
            const blogList = response1.body, blogId = response1.body[blogList.length - 1]._id;
            ids = blogId;
            const response = yield (0, supertest_1.default)(app_1.default).get(`/api/blogs/${blogId}`);
            (0, globals_1.expect)(response.status).toBe(200);
        }));
        (0, globals_1.it)('get unexisting single posts/blogs', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).get(`/api/blogs/65e0628b855cedbb9bce7368kk`);
            (0, globals_1.expect)(response.status).toBe(500);
        }));
        (0, globals_1.it)('update single posts/blogs unauthenticated', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).patch(`/api/blogs/${ids}`).
                send({ title: "test patching blog" });
            (0, globals_1.expect)(response.statusCode).toBe(401);
        }));
        (0, globals_1.it)('update single posts/blogs with inavalid id', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).patch(`/api/blogs/65e0628b855cedbb9bce7368kk`)
                .set("Authorization", `Bearer ${token}`);
            (0, globals_1.expect)(response.status).toBe(500);
        }));
        (0, globals_1.it)('sending a comment to posts/blogs successful', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).get(`/api/blogs/${ids}/comments`)
                .send({
                name: "emmanuel",
                email: "emmy@gmail.com",
                commentSent: "test of comment"
            })
                .set("Authorization", `Bearer ${token}`);
            (0, globals_1.expect)(response.status).toBe(200);
        }));
        (0, globals_1.it)('sending a comment to posts/blogs unauthenticated user', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).post(`/api/blogs/${ids}/comments`);
            (0, globals_1.expect)(response.status).toBe(401);
        }));
        (0, globals_1.it)('get all comment to posts/blogs unauthenticated user', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).get(`/api/blogs/${ids}/comments`);
            (0, globals_1.expect)(response.status).toBe(401);
        }));
        (0, globals_1.it)('get all comment to posts/blogs successful', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).post(`/api/blogs/${ids}/comments`)
                .set("Authorization", `Bearer ${token}`);
            (0, globals_1.expect)(response.status).toBe(201);
        }));
        (0, globals_1.it)('Post liked not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
            const id = blogId;
            const response = yield (0, supertest_1.default)(app_1.default)
                .post(`/api/blogs/${id}/likes`);
            (0, globals_1.expect)(response.status).toBe(401);
            (0, globals_1.expect)(response.body.message).toContain('Unauthenticated user detected. Please login to continue');
        }));
        (0, globals_1.it)('Post liked to authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
            const id = blogId;
            const response = yield (0, supertest_1.default)(app_1.default)
                .post(`/api/blogs/${ids}/likes`)
                .set("Authorization", `Bearer ${token}`);
            (0, globals_1.expect)(response.status).toBe(200);
        }));
        (0, globals_1.it)('Post liked to unexisting blog id ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post(`/api/blogs/65e06b0eeb86efe8076659a4/likes`)
                .set("Authorization", `Bearer ${token}`);
            (0, globals_1.expect)(response.status).toBe(404);
        }));
        (0, globals_1.it)('Post liked to unexisting blog id ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post(`/api/blogs/65e06b0eeb86efe8076659a477/likes`)
                .set("Authorization", `Bearer ${token}`);
            (0, globals_1.expect)(response.status).toBe(500);
        }));
        (0, globals_1.it)('Post unliked to unauthenticated user', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post(`/api/blogs/${ids}/likes`);
            (0, globals_1.expect)(response.status).toBe(401);
            (0, globals_1.expect)(response.body.message).toContain('Unauthenticated user detected. Please login to continue');
        }));
        (0, globals_1.it)('Post unliked successfully ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post(`/api/blogs/${ids}/likes`)
                .set("Authorization", `Bearer ${token}`);
            (0, globals_1.expect)(response.status).toBe(200);
        }));
        (0, globals_1.it)('Post unliked to unexisting blog id ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post(`/api/blogs/65e06b0eeb86efe8076659a4/likes`)
                .set("Authorization", `Bearer ${token}`);
            (0, globals_1.expect)(response.status).toBe(404);
        }));
        (0, globals_1.it)('Post unliked to unexisting blog id ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post(`/api/blogs/65e06b0eeb86efe8076659a4uuuu/likes`)
                .set("Authorization", `Bearer ${token}`);
            (0, globals_1.expect)(response.status).toBe(500);
        }));
        (0, globals_1.it)('update single posts/blogs successfull', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).delete(`/api/blogs/${ids}`)
                .set("Authorization", `Bearer ${token}`);
            (0, globals_1.expect)(response.statusCode).toBe(200);
        }));
    });
    (0, globals_1.describe)('message testing', () => {
        (0, globals_1.it)('send message', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default).post('/api/messages').send({
                name: "",
                email: "janed57hgjhjjhjjbh8hghh@gmail.com",
                message: "hellojwo7hhjjhhjrl4j4hdwwsqw"
            });
            (0, globals_1.expect)(res.statusCode).toBe(400);
        }));
        (0, globals_1.it)('should get all message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).get('/api/messages');
            (0, globals_1.expect)(response.statusCode).toBe(200);
        }));
        (0, globals_1.it)('should delete message', () => __awaiter(void 0, void 0, void 0, function* () {
            const id = "65dca703cda1e0f1fdfacc1c";
            const response = yield (0, supertest_1.default)(app_1.default).delete(`/api/messages/${id}`);
            (0, globals_1.expect)(response.statusCode).toBe(200);
        }));
        (0, globals_1.it)('should update message', () => __awaiter(void 0, void 0, void 0, function* () {
            const id = "65dca703cda1e0f1fdfacc1c";
            const response = yield (0, supertest_1.default)(app_1.default).patch(`/api/messages/${id}`);
            (0, globals_1.expect)(response.statusCode).toBe(404);
        }));
    });
    (0, globals_1.describe)('comment testing', () => {
        (0, globals_1.it)('should create comment', () => __awaiter(void 0, void 0, void 0, function* () {
            const id = '';
            const response = yield (0, supertest_1.default)(app_1.default).post(`/api/${id}/comments`)
                .set("authorization", token)
                .send({
                name: "jjjjjjjjgkjhask",
                email: "jjjjjjjjhbvhssak@gmail.com",
                commentSent: "that's  great",
            });
            (0, globals_1.expect)(response.statusCode).toBe(404);
        }));
        (0, globals_1.it)('should get all comment', () => __awaiter(void 0, void 0, void 0, function* () {
            const id = blogId;
            const response = yield (0, supertest_1.default)(app_1.default).get(`/api/${id}/comments`);
            (0, globals_1.expect)(response.statusCode).toBe(404);
        }));
    });
});
