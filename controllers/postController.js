const Post = require('../models/post');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.get = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).exec();

  if (!post) {
    const err = new Error('Post not found');
    err.status = 404;
    return next(err);
  }

  res.json({ data: { post } });
});

exports.post = [
  body('title')
    .trim()
    .isLength({ min: 1 })
    .withMessage(`Title can't be empty.`),
  body('text').trim(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const user = await User.findOne(
      { username: req.params.username },
      { password: 0 }
    ).exec();

    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      return next(err);
    }

    const post = new Post({
      user: user,
      title: req.body.title,
      text: req.body.text,
    });

    if (!errors.isEmpty()) {
      const err = new Error(JSON.stringify(errors.array()));
      err.status = 400;
      return next(err);
    } else {
      await post.save();
      res.json({ data: { post } });
    }
  }),
];

exports.put = [
  body('title')
    .trim()
    .isLength({ min: 1 })
    .withMessage(`Title can't be empty.`),
  body('text').trim(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const post = new Post({
      title: req.body.title,
      text: req.body.text,
      published: req.body.published,
      _id: req.params.id,
    });

    if (!errors.isEmpty() && req.body.title) {
      const err = new Error(JSON.stringify(errors.array()));
      err.status = 400;
      return next(err);
    } else {
      const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, {});
      res.json({ data: { updatedPost } });
    }
  }),
];

exports.delete = asyncHandler(async (req, res, next) => {
  const deletedPost = await Post.findByIdAndRemove(req.params.id);

  if (!deletedPost) {
    const err = new Error('Post not found');
    err.status = 404;
    return next(err);
  }

  res.json({ data: { deletedPost } });
});
