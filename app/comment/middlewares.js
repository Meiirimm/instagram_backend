const Comment = require('../post/Comment')

const isAuthorOfComment = async (req, res, next) => {
    const comment = await Comment.findOne({
    where: {
        id: req.params.commentId,
        user_id: req.user.id,
    },
    });

    if (!comment) {
        return res.status(401).send({ error: 'Unauthorized to delete this comment' });
    }

    next();
  };
  

module.exports = {
    isAuthorOfComment
}