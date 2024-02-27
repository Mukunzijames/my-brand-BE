import Passport from "../helper/wait";
import { Request,Response,NextFunction } from 'express';
import userSchema ,{ IUser } from "../models/user";




export const isAuthenticated=(req:any,res:Response,next:NextFunction)=>{
    Passport.authenticate('jwt', { session: false, }, async (error:any,token:IUser) => {
        if (error || !token) {
           return res.status(401).json({ message: 'Unauthenticated user detected. Please login to continue' });
        }
        console.log(token)
        req.user=token
         return next()
    })(req, res, next);
}
export const isAdmin=(req:any,res:Response,next:NextFunction)=>{
    Passport.authenticate('jwt', { session: false, }, async (error:any,user:IUser) => {
        if (error || !user) {
          return  res.status(401).json({ message: 'Unauthenticated user detected. Please login to continue' });
        }
        try {
            const logedUser=await userSchema.findOne({email:user.email});
            if(!logedUser)return res.status(401).json({error:"user not found please try again"})
            const userType=logedUser.role;
            if(userType!=='admin'){
             return res.status(401).json({error: 'you are not allowed to perform this operation' });
            }
        } catch (error) {
            next(error);
        }
        return next()
    })(req, res, next);
}

