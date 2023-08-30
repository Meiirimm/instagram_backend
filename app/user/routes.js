const express = require('express')
const router = express.Router();
const {updateUser, getUserByUsername, followUser, unfollowUser, getFollowersByUsername, getFollowingsByUsername} = require('./controllers')
const {isUserAuthorized} = require('./middlewares')
const passport = require('passport');
const {upload} = require('./multer')

router.put('/api/user/:id' , passport.authenticate('jwt', {session: false}), isUserAuthorized, upload.single('profilePic'), updateUser)
router.get('/api/user/byUsername/:username', passport.authenticate('jwt', {session: false}), getUserByUsername);
router.post('/api/user/follow/:userId', passport.authenticate('jwt', { session: false }), followUser);
router.post('/api/user/unfollow/:userId', passport.authenticate('jwt', { session: false }), unfollowUser);
router.get('/api/followers/:username', passport.authenticate('jwt', { session: false }), getFollowersByUsername); //получить подписчиков по имени пользователя
router.get('/api/followings/:username', passport.authenticate('jwt', { session: false }), getFollowingsByUsername); //получить подписки по имени пользователя
  
module.exports = router; 