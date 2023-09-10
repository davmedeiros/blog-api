const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

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

module.exports = router;
