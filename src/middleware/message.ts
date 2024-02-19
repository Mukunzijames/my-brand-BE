import { sendMessage } from "../utils/validation";
import { Request,Response } from "express";
const messageValidate = async(req:Request, res:Response,next:Function) => {
    try{
        const {error} = sendMessage(req.body);
        if (error) {
            return res.status(400).send({ error: error.details[0].message });
        }
        next();
    } catch(error){
        console.log(error);
        res.status(500).send({ error:"internal error"})
    }
}
export {messageValidate}