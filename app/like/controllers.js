const Post = require('../post/Post')
const Comment = require('../post/Comment')
const PostLike = require('./models/PostLike');
const CommentLike = require('./models/CommentLike');


const createPostLike = async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user.id;

    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).send({ error: 'Post not found' });
    }

    await PostLike.create({
      postId,
      userId,
    });

    res.status(201).send({ message: 'Post liked successfully' });
};

const deletePostLike = async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user.id;

    await PostLike.destroy({
      where: {
        postId,
        userId,
      },
    });

    res.status(200).send({ message: 'Post like removed successfully' });
};

const createCommentLike = async (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.user.id;

    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).send({ error: 'Comment not found' });
    }

    await CommentLike.create({
      commentId,
      userId,
    });

    res.status(201).send({ message: 'Comment liked successfully' });
};

const deleteCommentLike = async (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.user.id;

    await CommentLike.destroy({
      where: {
        commentId,
        userId,
      },
    });

    res.status(200).send({ message: 'Comment like removed successfully' });
};

module.exports = {
  createPostLike,
  deletePostLike,
  createCommentLike,
  deleteCommentLike,
};
