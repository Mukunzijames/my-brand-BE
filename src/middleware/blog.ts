import { enterBlogData } from "../utils/validation";
import { Request,Response } from "express";
const BlogValidate = async(req:Request, res:Response,next:Function) => {
    try{
        const {error} = enterBlogData(req.body);
        if (error) {
            return res.status(400).send({ error: error.details[0].message });
        }
        next();
    } catch(error){
        console.log(error);
        res.status(500).send({ error:"internal error"})
    }
}
export {BlogValidate}