const User = require('../auth/User')
const Post = require('../post/Post')
const UserFollowing = require('../user/models/UserFollowing');

const fs = require('fs');


const updateUser = async(req, res) => {

    const user = await User.findByPk(req.params.id)


    if (user.profilePic) {
        fs.unlink(`./public${user.profilePic}`, (err) => {
          if (err) {
            console.error('Error deleting old profile picture:', err);
          }
        });
      }
    
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
}

const getUserByUsername = async(req, res) => {
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
  
}

const followUser = async(req, res) => {
    const userToFollow = await User.findByPk(req.params.userId);

    if (!userToFollow) {
      return res.status(404).json({ error: 'User not found' });
    }

    await req.user.addFollowings(userToFollow);

    res.status(200).send({ message: 'You are now following this user' });
} 

const unfollowUser = async(req, res) => {
    const userToUnfollow = await User.findByPk(req.params.userId);

    if (!userToUnfollow) {
      return res.status(404).json({ error: 'User not found' });
    }

    await req.user.removeFollowing(userToUnfollow);
    res.status(200).send({ message: 'You  have unfollowed this user' });
}

const getFollowersByUsername = async(req, res) => {
    const user = await User.findOne({
        where: { user_name: req.params.username },
        include: {
          model: User,
          as: 'followers',
          through: { attributes: [] }, // Exclude joining table attributes from the result
        },
      });
    
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
    
      res.status(200).send(user.followers);
}

const getFollowingsByUsername = async (req, res) => {
    const user = await User.findOne({
      where: { user_name: req.params.username },
      include: {
        model: User,
        as: 'followings',
        attributes: ['id', 'user_name', 'profilePic'], // Include only specific attributes
        through: { attributes: [] }, // Exclude joining table attributes from the result
      },
    });

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.status(200).send(user.followings);
};



module.exports = {
    updateUser,
    getUserByUsername,
    followUser,
    unfollowUser,
    getFollowersByUsername,
    getFollowingsByUsername
}