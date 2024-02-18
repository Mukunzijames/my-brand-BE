import { Router } from "express";

import {createPost,getAllPost,getPost,updatePost} from "../controllers/blog"



const route = Router()
route.post('/blog',createPost)
route.get('/blog/:id',getPost)


export default route

