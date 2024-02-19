import { Router } from "express";

import { commentShow,commentPost } from "../controllers/comment";
import { commentValidate } from "../middleware/comment";


const PostRouter = Router()

PostRouter.post('/:id/comments',commentPost)
PostRouter.get('/:id/comments',commentShow)

export default PostRouter