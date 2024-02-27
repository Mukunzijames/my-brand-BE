import { Router } from "express";

import { createMessage, getMessages, getMessage, deleteMessage, updateMessage} from "../controllers/message";
import { isAdmin } from "../middleware/authorization";

const messageRouter = Router();

messageRouter.post("/", createMessage)
messageRouter.get("/", getMessages)
messageRouter.get("/:id",isAdmin,getMessage)
messageRouter.patch("/:id",updateMessage)
messageRouter.delete("/:id",deleteMessage)

export default messageRouter;