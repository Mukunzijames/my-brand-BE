import {Schema ,Types, model} from 'mongoose';

interface comment {
    name:string,
    email:string,
    commentSent:string,
    blog:Types.ObjectId
}

const commentSchema = new Schema<comment>({
    name: {
        type: 'string',
        required: false
    },
    email: {
        type: 'string',
        required: false,
    },
    commentSent: {
        type: 'string',
        required: false
    },
    
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }
});
export const Comment = model<comment>('Comment', commentSchema);









