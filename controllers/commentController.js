const Comment = require('../models/comment');
const Post = require('../models/post');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.get = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id).exec();

  if (!comment) {
    const err = new Error('Comment not found');
    err.status = 404;
    return next(err);
  }

  res.json({ data: { comment } });
});

exports.post = [
  body('text').trim(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const post = await Post.findById(req.params.postId).exec();

    if (!post) {
      const err = new Error('Post not found');
      err.status = 404;
      return next(err);
    }

    const comment = new Comment({
      post: post,
      text: req.body.text,
    });

    if (!errors.isEmpty()) {
      const err = new Error(JSON.stringify(errors.array()));
      err.status = 400;
      return next(err);
    } else {
      await comment.save();
      res.json({ data: { comment } });
    }
  }),
];

exports.put = [
  body('text').trim(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const comment = new Comment({
      text: req.body.text,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const err = new Error(JSON.stringify(errors.array()));
      err.status = 400;
      return next(err);
    } else {
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        comment,
        {}
      );
      res.json({ data: { updatedComment } });
    }
  }),
];

exports.delete = asyncHandler(async (req, res, next) => {
  const deletedComment = await Comment.findByIdAndRemove(req.params.id);

  if (!deletedComment) {
    const err = new Error('Comment not found');
    err.status = 404;
    return next(err);
  }

  res.json({ data: { deletedComment } });
});
