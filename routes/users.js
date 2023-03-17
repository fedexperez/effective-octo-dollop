//path: /api/users
const express = require('express');
const router = express.Router();

const { getUsers } = require('../controllers/users');

const { validateJWT } = require('../middlewares/validate-jwt');

router.get('/',[
    validateJWT
],getUsers);

module.exports = router;