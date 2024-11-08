const express=require('express');
const {createPost, latestPost,popularPost, likes, getPostsByAuthor}=require('../controllers/postController');




const router =express.Router();

router.post('/create',createPost)
router.get('/latest',latestPost)
router.get('/popular',popularPost)
router.post('/:id/like',likes)
router.get('/posts/:authorId', getPostsByAuthor);

module.exports = router;