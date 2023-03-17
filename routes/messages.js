//path: /api/messages
const express = require('express');
const router = express.Router();

const { getChat } = require('../controllers/messages');

const { validateJWT } = require('../middlewares/validate-jwt');

router.get('/:toUserId',[validateJWT], getChat);

module.exports = router;