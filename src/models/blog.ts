// import { number } from "joi";
import mongoose from "mongoose";
 export interface  Ipost{
  title:string,
  desc:string,
  image:string,
  like:Number
}


const PostSchema=new mongoose.Schema<Ipost>({
  title:{
    type:String,
    required:true,
    unique:true
  },
  desc:{
   type:String,
  },
  image:{
    type:String,
    required:false
    
  },
  like:{
    type:Number,
    default:0
  }
 
},
{timestamps:true}
);
export default    mongoose.model<Ipost>('Post',PostSchema)
 