const Comment = require('../post/Comment')

// Middleware для проверки, является ли текущий пользователь автором комментария
const isAuthorOfComment = async (req, res, next) => {
    // Поиск комментария по его идентификатору и идентификатору текущего пользователя
    const comment = await Comment.findOne({
        where: {
            id: req.params.commentId,
            user_id: req.user.id,
        },
    });

    // Если комментарий не найден или текущий пользователь не является автором
    if (!comment) {
        return res.status(401).send({ error: 'Unauthorized to delete this comment' });
    }
    next();
};
  

module.exports = {
    isAuthorOfComment
}