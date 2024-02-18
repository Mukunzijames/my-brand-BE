import Router from "express";

import {createPost,getAllPost,getPost,updatePost,deletePost} from "../controllers/blog"



const route = Router()
// console.log('get')
route.post('/blogs',createPost)
route.get('/blogs/:id',getPost)
route.get('/blogs',getAllPost)
route.patch('/blogs/:id',updatePost)
route.delete('/blogs/:id',deletePost)


export default route

