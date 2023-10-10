const isUserAuthorized = (req, res, next) => {
    // Проверяем, аутентифицирован ли пользователь
    if (!req.isAuthenticated()) {
      return res.status(401).send({ error: "Unauthorized" });
    }
  
    // Проверяем, имеет ли текущий пользователь права на редактирование профиля
    const userId = req.user.id;
    if (userId !== parseInt(req.params.id)) {
      return res.status(403).send({ error: "You are not authorized to edit this user" });
    }
  
    next();
  };
  
  module.exports = {
    isUserAuthorized,
  };
  