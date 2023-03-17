//path: /api/login
const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { createUser, login, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

router.post('/new',[
    check('name','The name is required').notEmpty(),
    check('password','The password is required').notEmpty(),
    check('email','An email is required').notEmpty().isEmail(),
    validateFields
],createUser);

router.post('/',[
    check('email','An email is required').notEmpty().isEmail(),
    check('password','The password is required').notEmpty(),
    validateFields
],login);

router.get('/renew',[
    check('email','An email is required').notEmpty().isEmail(),
    check('password','The password is required').notEmpty(),
    validateJWT
],renewToken);

module.exports = router;