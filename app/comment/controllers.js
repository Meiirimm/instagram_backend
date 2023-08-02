const Post = require('../post/Post')
const User = require('../auth/User')
const Comment = require('../post/Comment')

const createComment = async(req, res) => {
  
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
  
}

const deleteComment = async(req, res) => {
    const comment = await Comment.findOne({
        where: { id: req.params.commentId },
    });
  
    if (!comment) {
        return res.status(404).send({ error: 'Comment not found' });
    }

    await comment.destroy();

    res.status(200).send({ message: 'Comment successfully deleted' });
  
}

const getCommentsByPostId = async (req, res) => {
      const comments = await Comment.findAll({
        where: { post_id: req.params.postId },
        include: { model: User, as: 'user', attributes: ['id', 'user_name', 'profilePic'] },
      });
  
      res.status(200).json(comments);
};
  

module.exports = {
    createComment,
    deleteComment,
    getCommentsByPostId
}