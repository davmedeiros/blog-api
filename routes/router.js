const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Home
router.get('/', (req, res) => {
  res.send(`GET ${req.url}  - to be implemented...`);
});

// User
router.get('/user/:username', userController.get);

router.post('/user', userController.post);

router.put('/user/:username', userController.put);

router.delete('/user/:username', (req, res) => {
  res.send(`DELETE ${req.url} - to be implemented...`);
});

// Post
router.get('/post/:id', (req, res) => {
  res.send(`GET ${req.url} - to be implemented...`);
});

router.post('/post/:id', (req, res) => {
  res.send(`POST ${req.url} - to be implemented...`);
});

router.put('/post/:id', (req, res) => {
  res.send(`PUT ${req.url} - to be implemented...`);
});

router.delete('/post/:id', (req, res) => {
  res.send(`DELETE ${req.url} - to be implemented...`);
});

module.exports = router;
