import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js'

export const test = (req, res) => {  
    res.send('this works');
}

// export const getPosts = async (req, res) => {  

//     const { page } = req.query;

//     try {
//         const LIMIT = 8;
//         const startIndex = (Number(page) - 1) * LIMIT;
//         const postMessages = await PostMessage.find() // extracting all data present in database

//         res.status(200).json(postMessages)  /*  if everyone went ok we return 200 and then we 
//                                                 return json which is an array of all messages 
//                                                 we have;
//                                                 all arrays are returned on webpage
//                                             */
                                            
//     } catch (error) {
//         res.status(404).json( {message: error})
//     }
// }

export const getPosts = async (req, res) => {  

    const { page } = req.query;

    try {
        const LIMIT = 4;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

        const total = await PostMessage.countDocuments({}); //  get the total number of posts 

        const posts = await PostMessage.find().sort({ _id: -1}).limit(LIMIT).skip(startIndex); // extracting all data present in database

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)})  /*  if everyone went ok we return 200 and then we 
                                                return json which is an array of all messages 
                                                we have;
                                                all arrays are returned on webpage
                                            */
                                            
    } catch (error) {
        res.status(404).json( {message: error})
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        res.status(200).json(post);

    } catch (error) {
        res.status(404).json( {message: error})
    }
}

// QUERY -> /posts?page=1 -> page=1
// PARAMS -> /posts/:id -> /posts/123 -> id=123
export const getPostsBySearch = async (req, res) => {

    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, 'i'); // flag of i -> case insensitive

        const posts = await PostMessage.find({ $or: [{ title }, {tags: { $in: tags.split(',') }}]});

        res.status(200).json({ data: posts });
        
    } catch (error) {   
        res.status(404).json({message: error});
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

export const commentPost = async (req, res) => {
    const { id } = req.params;

    const { value } = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true});

    res.json(updatedPost);
}