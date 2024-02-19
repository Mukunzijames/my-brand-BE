import joi, { string } from "joi"
import {Ipost} from "../models/blog"
import{ Imessage } from "../models/message"
import { Comment } from "../models/comment"

// export const validateLoginData = (login:{email:string, password:string})=> {

//     const loginSchema = joi.object ({

//         email:joi.string().email().required,
//         password:joi.string().min(10).max(32).required
//     })

//     return loginSchema.validate(login)

// }

export const enterBlogData = (blogs: Ipost)=>{

    const PostsSchema = joi.object ({
        title:joi.string().min(10).max(32).required,
        desc:joi.string().min(5).max(100).required,
        message:joi.string().required
    })
    return  PostsSchema.validate(blogs)
}

export const sendMessage =(message:Imessage)=>{

const messageSchema =joi.object ({
    name:joi.string().min(8).max(32).required,
    email:joi.string().email().required,
    subject:joi.string().min(8).max(32).required,
    message:joi.string().min(8).max(32).required

})
return messageSchema.validate(message)
}

// export const sendComment =(Comment:comment)=>{
// const commentSchema =joi.object ({
//     name:joi.string().min(8).max(32).required,
//     email:joi.string().email().required
// })
// return commentSchema.validate(comment)
// }