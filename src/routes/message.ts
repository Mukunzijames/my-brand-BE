import { Router } from "express";

import { createMessage, getMessages, getMessage, deleteMessage, updateMessage} from "../controllers/message";
import { messageValidate } from "../middleware/message";

const messageRouter = Router();

messageRouter.post("/", createMessage)
messageRouter.get("/", getMessages)
messageRouter.get("/:id",getMessage)
messageRouter.patch("/:id",updateMessage)
messageRouter.delete("/:id",deleteMessage)

export default messageRouter;