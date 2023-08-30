const User = require('../auth/User')
const Post = require('../post/Post')
const fs = require('fs');


const updateUser = async(req, res) => {
  try {
    const user = await User.findByPk(req.params.id)

    // Если у пользователя уже есть профильная фотография, удаляем ее
    if (user.profilePic) {
        fs.unlink(`./public${user.profilePic}`, (err) => {
          if (err) {
            console.error('Error deleting old profile picture:', err);
          }
        });
      }
    
    // Обновляем информацию пользователя
    await User.update({
        email: req.body.email,
        full_name: req.body.full_name,
        user_name: req.body.user_name,
        bio: req.body.bio,
        website: req.body.website,

        profilePic: req.file ? '/profile_images/' + req.file.filename : user.profilePic,
        },
    {
        where: {
            id: req.params.id
        }
    })

    res.status(200).send({ message: "User data successfully updated"});

  } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
  }
}

const getUserByUsername = async(req, res) => {
  try {
    const user = await User.findOne({
      where: { user_name: req.params.username },
      include: {
          model: Post,
          as: 'posts',
      },
    });

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
 
    res.status(200).send(user);
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
  }  
}

const followUser = async(req, res) => {
  try {
    // Находим пользователя, которого текущий пользователь хочет подписаться
    const userIdToFollow = req.params.userId;
    
    const currentUser = req.user;
    const userToFollow = await User.findByPk(userIdToFollow);

    if (!userToFollow) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Проверяем, что пользователь еще не подписан
    const isAlreadyFollowing = await currentUser.hasFollowings(userToFollow);
    if (isAlreadyFollowing) {
        return res.status(400).json({ error: 'You are already following this user' });
    }

    // Добавляем пользователя в список подписок текущего пользователя
    await req.user.addFollowings(userToFollow);

    res.status(200).send({ message: 'You are now following this user' });
    
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
  }
} 

const unfollowUser = async(req, res) => {
  try {
    // Находим пользователя, которого текущий пользователь хочет отписаться
    const userToUnfollow = await User.findByPk(req.params.userId);

    if (!userToUnfollow) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Проверяем, что пользователь действительно был подписан
    const isFollowing = await currentUser.hasFollowings(userToUnfollow);
    if (!isFollowing) {
        return res.status(400).json({ error: 'You are not following this user' });
    }    

    // Удаляем пользователя из списка подписок текущего пользователя
    await req.user.removeFollowing(userToUnfollow);
    res.status(200).send({ message: 'You  have unfollowed this user' });
    
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
  }
}

const getFollowersByUsername = async(req, res) => {
  try {
    const user = await User.findOne({
      where: { user_name: req.params.username },
      include: {
        // Включаем связанных подписчиков пользователя
        model: User,
        as: 'followers',
        attributes: ['id', 'user_name', 'profilePic'], // Выбираем только определенные атрибуты для вывода
        through: { attributes: [] }, // // Игнорировать атрибуты из промежуточной таблицы
      },
    });
  
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Отправляем ответ с данными о подписчиках пользователя
    res.status(200).send(user.followers);
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
  }
}

const getFollowingsByUsername = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { user_name: req.params.username },
      include: {
        // Включаем пользователей, на которых подписан текущий пользователь
        model: User,
        as: 'followings',
        attributes: ['id', 'user_name', 'profilePic'], // Выбираем только определенные атрибуты для вывода
        through: { attributes: [] }, // // Игнорировать атрибуты из промежуточной таблицы
    },
    });

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Отправляем ответ с данными о пользователях, на которых подписан текущий пользователь
    res.status(200).send(user.followings);
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
  }
};



module.exports = {
    updateUser,
    getUserByUsername,
    followUser,
    unfollowUser,
    getFollowersByUsername,
    getFollowingsByUsername
}