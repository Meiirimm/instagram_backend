const isUserAuthorized = async (req, res, next) => {
    const userId = Number(req.params.id);
  
    // Проверяем, является ли текущий пользователь владельцем профиля
    if (req.user.id === userId) {
        return next();
    } else {
        return res.status(403).send({ error: "You are not authorized to edit this user" });
    }
};
  

module.exports = {
    isUserAuthorized
}