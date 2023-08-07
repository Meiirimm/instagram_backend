const express = require('express');
const router = express.Router();
const passport = require('passport');

const { createPostLike, deletePostLike, createCommentLike, deleteCommentLike } = require('./controllers');

router.post('/api/post/:postId/like',passport.authenticate('jwt', {session: false}), createPostLike);
router.delete('/api/post/:postId/like',passport.authenticate('jwt', {session: false}), deletePostLike);
router.post('/api/comment/:commentId/like',passport.authenticate('jwt', {session: false}), createCommentLike);
router.delete('/api/comment/:commentId/like',passport.authenticate('jwt', {session: false}), deleteCommentLike);

module.exports = router;
