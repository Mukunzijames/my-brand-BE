import mongoose from "mongoose";

const PostSchema=new mongoose.Schema({
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
 
},
{timestamps:true}
);
export default    mongoose.model('Post',PostSchema)
 