const Post = require('./Post')

const isAuthorOfPost = async(req, res, next) => {
    const id = req.params.id || req.body.id

    const post = await Post.findByPk(id)
    if(!post) res.status(400).send({message: 'Post not found'})
    else if(req.user.id === post.user_id) next()
    else res.status(403).send({message: 'Access Forbiden'})
}

  

module.exports = {
    isAuthorOfPost
}