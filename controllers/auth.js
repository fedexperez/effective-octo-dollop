const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { genJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    const { name, email, password } = req.body;

    try {
        const mailExists = await User.findOne({ email });
        if (mailExists) {
            return res.status(400).json({
                ok: false,
                //Mail already registered
                msg: 'Invalid Data',
            });
        }

        const user = new User(req.body);

        //Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        //Generate my JWT
        const token = await genJWT(user.id);

        await user.save();

        res.json({
            ok: true,
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }

}

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (!userExists) {
            return res.status(404).json({
                ok: false,
                //Mail not found
                msg: 'Invalid Data',
            });
        }

        const validPassword = bcrypt.compareSync(password, userExists.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                //Not valid password
                msg: 'Invalid Data',
            });
        }

        //Generate my JWT
        const token = await genJWT(userExists.id);

        res.json({
            ok: true,
            user: userExists,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contact admin'
        });
    }
}

const renewToken = async (req, res = response) => {

    try {
        const uid = req.uid;

        const token = await genJWT(uid);

        const user = await User.findById(uid);

        res.json({
            ok: true,
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contact admin'
        });
    }



}

module.exports = {
    createUser,
    login,
    renewToken
}