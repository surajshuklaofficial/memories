import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js'

export const test = (req, res) => {  
    res.send('this works');
}

export const getPosts = async (req, res) => {  
    try {
        const postMessages = await PostMessage.find() // extracting all data present in database

        res.status(200).json(postMessages)  /*  if everyone went ok we return 200 and then we 
                                                return json which is an array of all messages 
                                                we have;
                                                all arrays are returned on webpage
                                            */
                                            
    } catch (error) {
        res.status(404).json( {message: error})
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage( {...post, creator: req.userId, createdAt: new Date().toDateString()});

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error});
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params; // { id: '64af821dd9cd152e5e5ab2b5' }
    const post = req.body; // exactly similar to schema

    // checking if requested id is really a mongoose object id
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { ...post, _id : id}, { new: true }); // { new: true } --> to recieve updated version of the post 

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id);

    res.json({message: 'Post deleted successfully!'});

}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.json({message: 'Unauthenticated'});

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        post.likes.push(req.userId);

    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true})

    res.json(updatedPost);
}
