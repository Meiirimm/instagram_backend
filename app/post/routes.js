const express = require('express')
const router = express.Router();
const {createPost, getMyPosts, getPostById, deletePost, editPost, getPostsByUsername} = require('./controllers')
const passport = require('passport');
const {upload} = require('./multer')
const {isAuthorOfPost} = require('./middlewares')



router.post('/api/post' , upload.array('image'), passport.authenticate('jwt', {session: false}), createPost)
router.get('/api/post' , passport.authenticate('jwt', {session: false}) , getMyPosts)
router.get('/api/post/:id' , passport.authenticate('jwt', {session: false}) , getPostById)
router.delete('/api/post/:id' , passport.authenticate('jwt', {session: false}) , isAuthorOfPost, deletePost)
router.put('/api/post' , passport.authenticate('jwt', {session: false}) , isAuthorOfPost, editPost)
router.get('/api/posts/byUsername/:username', passport.authenticate('jwt', {session: false}), getPostsByUsername);  


module.exports = router; 