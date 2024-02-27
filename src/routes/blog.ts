import { Router } from "express"
import { createPost, getAllPost, getPost, updatePost, deletePost, Likes ,unLikes} from "../controllers/blog"
import upload from "../helper/multer"
import Passport from "../helper/wait"
import {isAuthenticated,isAdmin} from "../middleware/authorization"



const blogRouter = Router()
blogRouter.post('/',isAdmin, upload.single('image'),createPost)
blogRouter.get('/:id', getPost)
blogRouter.get('/', getAllPost)
blogRouter.patch('/:id',isAdmin, updatePost)
blogRouter.delete('/:id',isAdmin, deletePost)
blogRouter.post("/:id/likes",isAuthenticated,Likes)
blogRouter.post("/:id",isAuthenticated,unLikes)


export default blogRouter