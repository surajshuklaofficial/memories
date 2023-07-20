import express from 'express';

import { test, getPosts, getPostsBySearch, getPost, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// http://localhost:5000/posts 

router.get('/test', test); // this callback function runs when user visits this route
router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.get('/:id', getPost);


router.post('/', auth, createPost); 
router.patch('/:id', auth, updatePost); // patch is used for updating 
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost',auth, likePost);

export default router;