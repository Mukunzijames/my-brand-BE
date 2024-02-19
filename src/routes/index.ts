import { Router } from "express"
import blogRouter from "./blog";
import messageRouter from "./message";
import PostRouter from "./comment";


const route = Router()

route.use("/blogs",blogRouter)
route.use("/messages",messageRouter)
route.use("/blogs",PostRouter)
export default route