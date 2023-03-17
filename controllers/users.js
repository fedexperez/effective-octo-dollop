const { response } = require('express');
const user = require('../models/user');
const User = require('../models/user');

const getUsers = async (req, res = response) => {

    const startFrom = Number(req.query.startFrom) || 0;

    const users = await User.find({_id: {$ne: req.uid}})
        .sort('-online')
        .skip(startFrom)
        .limit(20);

    res.json({
        ok: true,
        users: users,
        startFrom
    });
};

module.exports = {
    getUsers
};