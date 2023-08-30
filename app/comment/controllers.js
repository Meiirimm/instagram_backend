const Post = require('../post/Post')
const User = require('../auth/User')
const Comment = require('../post/Comment')

const createComment = async(req, res) => {
    try {
        const post = await Post.findByPk(req.params.postId);
        if (!post) {
            return res.status(404).send({ error: 'Post not found' });
        }
    
        const comment = await Comment.create({
            text: req.body.text,
            user_id: req.user.id,
            post_id: req.params.postId,
        });
    
        res.status(201).send({ message: 'Comment successfully created', comment });    
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });  
    }
}

const deleteComment = async(req, res) => {
    try {
        const comment = await Comment.findOne({
            where: { id: req.params.commentId },
        });
      
        if (!comment) {
            return res.status(404).send({ error: 'Comment not found' });
        }
    
        await comment.destroy();
    
        res.status(200).send({ message: 'Comment successfully deleted' });    
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });  
    }
}

const getCommentsByPostId = async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: { post_id: req.params.postId },
            include: { model: User, as: 'user', attributes: ['id', 'user_name', 'profilePic'] },
        });
    
        res.status(200).json(comments);    
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });  
    }
};
  

module.exports = {
    createComment,
    deleteComment,
    getCommentsByPostId
}