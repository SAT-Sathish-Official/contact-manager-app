const express = require('express')
const router = express.Router();
const { getUser, register, login } = require('../controllers/userControllers');
const validateToken = require('../middleware/validateToken');

router.post('/register', register).post('/login', login).get('/getuser', validateToken, getUser)

module.exports = router     