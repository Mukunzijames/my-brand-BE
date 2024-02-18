import { Router } from "express";

import { createMessage, getMessages, getMessage, deleteMessage, updateMessage} from "../controllers/message";

const route = Router();

route.post("/messages", createMessage)
route.get("/messages", getMessages)
route.get("/messages",getMessage)
route.patch("/messages",updateMessage)
route.delete("/messages",deleteMessage)

export default route;
