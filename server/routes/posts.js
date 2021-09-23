import express from "express";

import { getPosts, createPost, updatePost, deletePost, likePost, getPostsBySearch ,getPersonalPosts, getPost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router()

router.get('/search', getPostsBySearch)
router.get('/:id', getPost)
router.get('/creator/:creator', getPersonalPosts)

router.get('/', getPosts)
router.post('/',auth, createPost)
router.patch('/:id',auth, updatePost)
router.delete('/:id',auth, deletePost)
router.patch('/:id/likePost',auth, likePost)



export default router;