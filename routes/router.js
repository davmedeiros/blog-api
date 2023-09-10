const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

// Home
router.get('/', (req, res) => {
  res.send(`GET ${req.url}  - to be implemented...`);
});

// User
router.get('/user/:username', userController.get);

router.post('/user', userController.post);

router.put('/user/:username', userController.put);

router.delete('/user/:username', userController.delete);

// Post
router.get('/post/:username/:id', postController.get);

router.post('/post/:username', postController.post);

router.put('/post/:username/:id', postController.put);

router.delete('/post/:username/:id', postController.delete);

// Comment
router.get('/post/:username/:postId/:id', commentController.get);

router.post('/post/:username/:postId', commentController.post);

router.put('/post/:username/:postId/:id', commentController.put);

router.delete('/post/:username/:postId/:id', commentController.delete);

module.exports = router;
