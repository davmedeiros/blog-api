const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.get = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username }).exec();

  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    return next(err);
  }

  res.json({ data: { user } });
});

exports.post = [
  body('username')
    .trim()
    .isLength({ min: 5, max: 15 })
    .withMessage('Username must be 5-15 characters long.')
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric.'),
  body('name').trim(),
  body('surname').trim(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const user = new User({
      username: req.body.username,
      name: req.body.name,
      surname: req.body.surname,
    });

    if (!errors.isEmpty()) {
      const err = new Error(JSON.stringify(errors.array()));
      err.status = 400;
      return next(err);
    } else {
      await user.save();
      res.json({ data: { user } });
    }
  }),
];
