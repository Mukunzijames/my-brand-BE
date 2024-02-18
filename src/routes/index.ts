import {Router} from "express";

import blog from "../models/blog";




const route = Router()
route.use("/blogs",blog)
// console.log('get')



export default route

