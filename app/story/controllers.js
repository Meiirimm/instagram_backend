const Story = require('./Story');
const User = require('../auth/User')
const { Op } = require('sequelize');
const fs = require('fs');

const createStory = async(req, res) => {
    try {    
        const story = await Story.create({
          image: '/stories/' + req.file.filename,
          userId: req.user.id,
        });
    
        res.status(201).json({ message: 'Story added successfully', story });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteStory = async(req, res) => {
    try {
        const storyId = req.params.id;

        const story = await Story.findOne({
            where: {
                id: storyId,
                userId: req.user.id,
            },
        });

        if (!story) {
            return res.status(404).json({ message: 'Story not found or you do not have permission' });
        }

        // Удаляем файл изображения истории
        const imagePath = `./public${story.image}`;
        fs.unlinkSync(imagePath);

        // Удаляем историю из базы данных
        await story.destroy();

        res.status(200).json({ message: 'Story deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

const getStoriesByUser = async(req, res) => {
    try {
        const username = req.params.username;
    
        // Находим все истории пользователя, созданные за последние 24 часа
        const stories = await Story.findAll({
          where: {
            createdAt: {
              [Op.gte]: new Date(Date.now() - 24 * 60 * 60 * 1000), 
            },
          },
          include: [
            {
              model: User,
              as: 'user',
              where: {
                user_name: username,
              },
            },
          ],
        });
    
        res.status(200).json({ stories });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    
}

module.exports = {
    createStory,
    deleteStory,
    getStoriesByUser
}