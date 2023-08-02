const Post = require('./Post')
const User = require('../auth/User')
const Comment = require('./Comment')
const fs = require('fs');


const createPost = async(req, res) => {
    const images = req.files.map((file) => '/posts/' + file.filename);

    const post = await Post.create({
        image: images,
        caption: req.body.caption,
        user_id: req.user.id,
    })

    console.log(req.body);

    res.status(200).send({ message: 'Post created successfully', post })
}

const getMyPosts = async(req, res) => {
    const posts = await Post.findAll({where: {user_id: req.user.id}})
    res.status(200).send(posts)
}

const getPostById = async(req, res) => {
    const post = await Post.findByPk(req.params.id)
    res.status(200).send(post)
}

const deletePost = async(req, res) => {

    const post = await Post.findByPk(req.params.id);

    if (post.image && post.image.length > 0) {
        post.image.forEach((imagePath) => {
            const fullPath = `./public${imagePath}`;
            fs.unlinkSync(fullPath);
        });
    }
  
    const data = await Post.destroy({
        where: {
            id: req.params.id,
        },
    })
    console.log(data);
    res.status(200).send({ message: "Post successfully deleted" })
}

const editPost = async(req, res) => {
    await Post.update({
        caption: req.body.caption
    },
    {
        where: {
            id: req.body.id
        }
    })

    res.status(200).send({ message: "Post successfully updated"});
}

const getPostsByUsername = async(req, res) => {
    const user = await User.findOne({
        where: { user_name: req.params.username },
    });
  
    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }

    const posts = await Post.findAll({
        where: { user_id: user.id },
        include: {
            model: Comment,
            as: 'comments'
        },

    });
    res.status(200).send(posts);

}


module.exports = {
    createPost,
    getMyPosts,
    getPostById,
    deletePost,
    editPost,
    getPostsByUsername,
}