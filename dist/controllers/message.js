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
exports.deleteMessage = exports.updateMessage = exports.getMessage = exports.getMessages = exports.createMessage = void 0;
const message_1 = __importDefault(require("../models/message"));
const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Message = yield message_1.default.create({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.email,
            message: req.body.message
        });
        // await mailer(req.body.email, req.body.message);
        res.status(201).json(Message);
    }
    catch (error) {
        res.status(400).send();
    }
});
exports.createMessage = createMessage;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Messages = yield message_1.default.find();
        res.status(200).json(Messages);
    }
    catch (error) {
        res.status(404).json('The messages you are looking for are not found');
    }
});
exports.getMessages = getMessages;
const getMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Message = yield message_1.default.findById(req.params.id);
        if (message_1.default) {
            res.status(200).json(Message);
        }
        else {
            res.status(404).json('Message does not exist');
        }
    }
    catch (error) {
        res.status(404).json('Message does not exist');
    }
});
exports.getMessage = getMessage;
const updateMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Message = yield message_1.default.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        if (message_1.default) {
            res.status(201).json(Message);
        }
        else {
            res.status(404).json('Data was not updated');
        }
    }
    catch (error) {
        res.status(400).json('Data was not updated');
    }
});
exports.updateMessage = updateMessage;
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield message_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json('Message deleted successfully');
    }
    catch (error) {
        res.status(404).json('Message not found');
    }
});
exports.deleteMessage = deleteMessage;