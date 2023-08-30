const express = require('express')
const router = express.Router();
const passport = require('passport');
const { createComment, deleteComment, getCommentsByPostId} = require('./controllers')
const {isAuthorOfComment} = require('./middlewares')

router.post('/api/comment/:postId' , passport.authenticate('jwt', {session: false}), createComment)
router.delete('/api/comment/:commentId' , passport.authenticate('jwt', {session: false}) , isAuthorOfComment,  deleteComment)
router.get('/api/comments/:postId', passport.authenticate('jwt', { session: false }), getCommentsByPostId);

module.exports = router; 