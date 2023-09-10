const User = require('../models/user');
const asyncHandler = require('express-async-handler');

exports.get = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username }).exec();

  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    return next(err);
  }

  res.json({ data: { user } });
});
