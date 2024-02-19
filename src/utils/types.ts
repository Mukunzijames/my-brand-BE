import { Types ,ObjectId} from "mongoose";



//blogs
interface Ipost {
    title:string,
    desc:string,
    image:string,
    like:Number
}
//comment

interface comment {
    name:string,
    email:string,
    commentSent:string,
    blog:Types.ObjectId
}
//message

interface Imessage {
    name :string,
    email:string,
    subject:string,
    message:string,
}

export {Ipost,comment,Imessage}