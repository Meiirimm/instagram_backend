const Post = require('../post/Post')
const Comment = require('../post/Comment')
const PostLike = require('./models/PostLike');
const CommentLike = require('./models/CommentLike');
const Story = require('../story/Story');
const StoryLike = require('./models/StoryLike');

// Функция для создания лайка к посту
const createPostLike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;

    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).send({ error: 'Post not found' });
    }

    // Проверка, есть ли уже лайк от этого пользователя к данному посту
    const existingLike = await PostLike.findOne({
      where: {
        postId,
        userId,
      },
    });

    if (existingLike) {
      return res.status(400).send({ error: 'You have already liked this post' });
    }

    // Создание записи о лайке
    await PostLike.create({
      postId,
      userId,
    });

    res.status(201).send({ message: 'Post liked successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
  }
};

// Функция для удаления лайка к посту
const deletePostLike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;

    // Поиск существующего лайка пользователя к данному посту
    const existingLike = await PostLike.findOne({
      where: {
        postId,
        userId,
      },
    });

    if (!existingLike) {
      return res.status(404).send({ error: 'Like not found' });
    }

    // Удаление записи о лайке
    await PostLike.destroy({
      where: {
        postId,
        userId,
      },
    });

    res.status(200).send({ message: 'Post like removed successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
  }
};

// Функция для создания лайка к комментарию
const createCommentLike = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.user.id;

    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).send({ error: 'Comment not found' });
    }

    // Проверка, есть ли уже лайк от этого пользователя к данному комментарию
    const existingLike = await CommentLike.findOne({
      where: {
        commentId,
        userId,
      },
    });

    if (existingLike) {
      return res.status(404).send({ error: 'You have already liked this comment' });
    }

    // Создание записи о лайке
    await CommentLike.create({
      commentId,
      userId,
    });

    res.status(201).send({ message: 'Comment liked successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
  }
};

// Функция для удаления лайка к комментарию
const deleteCommentLike = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.user.id;

    // Поиск существующего лайка пользователя к данному комментарию
    const existingLike = await CommentLike.findOne({
      where: {
        commentId,
        userId,
      },
    });

    if (!existingLike) {
      return res.status(404).send({ error: 'Like not found' });
    }

    // Удаление записи о лайке
    await CommentLike.destroy({
      where: {
        commentId,
        userId,
      },
    });

    res.status(200).send({ message: 'Comment like removed successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
  }
};

// Функция для создания лайка к сторис
const createStoryLike = async (req, res) => {
  try {
    const storyId = req.params.storyId;
    const userId = req.user.id;

    const story = await Story.findByPk(storyId);
    if (!story) {
      return res.status(404).send({ error: 'Story not found' });
    }

    // Проверка, есть ли уже лайк от этого пользователя к данному сторис
    const existingLike = await StoryLike.findOne({
      where: {
        storyId,
        userId,
      },
    });

    if (existingLike) {
      return res.status(400).send({ error: 'You have already liked this story' });
    }

    // Создание записи о лайке
    await StoryLike.create({
      storyId,
      userId,
    });

    res.status(201).send({ message: 'Story liked successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
  }
};

// Функция для удаления лайка к комментарию
const deleteStoryLike = async (req, res) => {
  try {
    const storyId = req.params.storyId;
    const userId = req.user.id;

    // Поиск существующего лайка пользователя к данному комментарию
    const existingLike = await StoryLike.findOne({
      where: {
        storyId,
        userId,
      },
    });

    if (!existingLike) {
      return res.status(400).send({ error: 'Like not found' });
    }

    // Удаление записи о лайке
    await StoryLike.destroy({
      where: {
        storyId,
        userId,
      },
    });

    res.status(200).send({ message: 'Story like removed successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
  }
};


module.exports = {
  createPostLike,
  deletePostLike,
  createCommentLike,
  deleteCommentLike,
  createStoryLike,
  deleteStoryLike
};
