const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/app.config');

exports.login = async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        const error = new Error('User not found!');
        throw error;
    }
    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        const error = new Error('Password is Incorrect');
        throw error;
    }
    const token = jwt.sign({ userId: user._id, email: user.email }, config.appKey, { expiresIn: '1h' });
    return res.json({
        _id: user._id.toString(),
        token: token
    });

}

exports.signup = async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        const error = new Error('Email is already in use!');
        throw error;
    }
    const hasedPw = await bcrypt.hash(password, 12);
    const user = new User({ email: email, password: hasedPw });
    const createdUser = await user.save();
    const token = jwt.sign({ userId: createdUser._id, email: createdUser.email }, config.appKey, { expiresIn: '1h' });

    return res.json({
        _id: createdUser._id.toString(),
        token: token
    })
}