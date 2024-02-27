import { Router } from "express";

import { commentShow,commentPost } from "../controllers/comment";
import { isAuthenticated } from "../middleware/authorization";


const PostRouter = Router()

PostRouter.post('/:id/comments',commentPost)
PostRouter.get('/:id/comments',commentShow)

export default PostRouter