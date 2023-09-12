const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

const checkAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    const err = new Error('Authentication error - Please login first.');
    err.status = 401;
    return next(err);
  }

  if (req.params.username !== req.user.username) {
    const err = new Error('Authentication error - Not authorized.');
    err.status = 403;
    return next(err);
  }

  return next();
};

// Home
router.get('/', (req, res) => {
  const message = req.user ? `Welcome ${req.user.full_name}` : 'Home';
  res.json({ data: { message } });
});

// User
router.get('/user/:username', userController.get);

router.post('/user', userController.post);

router.put('/user/:username', checkAuthenticated, userController.put);

router.delete('/user/:username', checkAuthenticated, userController.delete);

router.get('/login', (req, res) => {
  res.json({ error: { message: 'Login page - to be implemented...' } });
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

// Post
router.get('/post/:username/:id', postController.get);

router.post('/post/:username', checkAuthenticated, postController.post);

router.put('/post/:username/:id', checkAuthenticated, postController.put);

router.delete('/post/:username/:id', checkAuthenticated, postController.delete);

// Comment
router.get('/post/:username/:postId/:id', commentController.get);

router.post('/post/:username/:postId', commentController.post);

router.put('/post/:username/:postId/:id', commentController.put);

router.delete('/post/:username/:postId/:id', commentController.delete);

module.exports = router;
