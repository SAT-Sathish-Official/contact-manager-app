const asyncHanlder = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getUser = asyncHanlder(async (req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(404)
        throw new Error('user not found')
    }
    res.status(200).json(user)
})
const register = asyncHanlder(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(404);
        throw new Error('All fields are required')
    }
    const existingUser = await User.findOne({ email })


    if (existingUser) {
        res.status(404);
        throw new Error('User already exists')
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ email, username, password: hashedPassword });
    if (user) {
        res.status(201).json({ message: 'user registered successfully', user, token: generateToken(user) });
    } else {
        res.status(404);
        throw new Error('user not registered')
    }

})
const login = asyncHanlder(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(404);
        throw new Error('All fields are required')
    }
    const user = await User.findOne({ email })
    if (!user) {
        res.status(404);
        throw new Error('User not found')
    }
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
        res.status(404);
        throw new Error('Invalid password')
    }
    res.status(200).json({ message: 'Logged in successfully', user, token: generateToken(user) })
})
const generateToken = (user) => {
    const { email, username, id } = user
    const token = jwt.sign({
        email, username, id
    }, process.env.TOKEN_KEY, { expiresIn: '1h' })
    return token
}
module.exports = { getUser, register, login }