const express = require('express')
const router = express.Router();
const passport = require('passport');
const {createStory,deleteStory, getStoriesByUser} = require('./controllers')
const {upload} = require('./multer')
const {isAuthorOfStory} = require('./middlewares')

router.post('/api/story' , passport.authenticate('jwt', {session: false}), upload.single('image'), createStory)
router.delete('/api/story/:id', passport.authenticate('jwt', { session: false }), isAuthorOfStory, deleteStory);
router.get('/api/user/:username/stories', passport.authenticate('jwt', { session: false }), getStoriesByUser);

module.exports = router; 