import { Router } from "express"
import { createPost, getAllPost, getPost, updatePost, deletePost, Likes ,unLikes} from "../controllers/blog"
import upload from "../helper/multer"

const blogRouter = Router()
blogRouter.post('/', upload.single('image'),createPost)
blogRouter.get('/:id', getPost)
blogRouter.get('/', getAllPost)
blogRouter.patch('/:id', updatePost)
blogRouter.delete('/:id', deletePost)
blogRouter.post("/:id/likes",Likes)
blogRouter.post("/:id",unLikes)


export default blogRouter