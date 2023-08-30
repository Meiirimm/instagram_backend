const Story = require('./Story')

const isAuthorOfStory = async (req, res, next) => {
    try {
      const storyId = req.params.id;
      const user = req.user; // Текущий авторизованный пользователь
  
      const story = await Story.findOne({
        where: {
          id: storyId,
          userId: user.id,
        },
      });

      if (story) {
        req.story = story;
        next();
      } else {
        res.status(403).json({ message: 'Access Forbidden' });
      }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    isAuthorOfStory
}
  