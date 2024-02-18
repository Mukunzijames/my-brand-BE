import { Request, Response } from 'express';

import message, { Imessage } from '../models/message';

const createMessage = async (req: Request, res: Response) => {
    try {
        const Message = await message.create({
            name: req.body.name,
            email: req.body.email,
            subject:req.body.email,
            message: req.body.message
        });

        // await mailer(req.body.email, req.body.message);
        res.status(201).json(Message);
    } catch (error) {
        res.status(400).send();
    }
};

const getMessages = async (req: Request, res: Response)=> {
    try {
        const Messages= await message.find();
        res.status(200).json(Messages);
    } catch (error) {
        res.status(404).json('The messages you are looking for are not found');
    }
};

const getMessage = async (req: Request, res: Response)=>{
    try {
        const Message= await message.findById(req.params.id);
        if (message) {
            res.status(200).json(Message);
        } else {
            res.status(404).json('Message does not exist');
        }
    } catch (error) {
        res.status(404).json('Message does not exist');
    }
};

const updateMessage = async (req: Request, res: Response)=>{
    try {
        const Message= await message.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        if (message) {
            res.status(201).json(Message);
        } else {
            res.status(404).json('Data was not updated');
        }
    } catch (error) {
        res.status(400).json('Data was not updated');
    }
};

const deleteMessage = async (req: Request, res: Response)=>{
    try {
        await message.findByIdAndDelete(req.params.id);
        res.status(200).json('Message deleted successfully');
    } catch (error) {
        res.status(404).json('Message not found');
    }
};

export  {createMessage,getMessages,getMessage,updateMessage,deleteMessage}

