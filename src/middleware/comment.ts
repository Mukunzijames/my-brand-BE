import { sendComment } from "../utils/validation";
import { Request,Response } from "express";
const commentValidate = async(req:Request, res:Response,next:Function) => {
    try{
        const {error} = sendComment(req.body);
        if (error) {
            return res.status(400).send({ error: error.details[0].message });
        }
        next();
    } catch(error){
        res.status(500).send({ error:"internal error"})
    }
}
export {commentValidate}