import mongoose, { Schema, model } from "mongoose";

const BlogSchema = new Schema({
    authorId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    tags:{
        type: [String],
    },
    excerpt:{
        type: String,
    },
    category:{
        type: String
    }
},{
    timestamps:true
})

const Blogs = model('Blogs' , BlogSchema);

export default Blogs;