import mongoose from "mongoose";

// creating mongoose schema
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    }, 
    comments: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

// creating schema into model
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage; // on model we can run commands like find, delete, create, update; PostMessage is a model