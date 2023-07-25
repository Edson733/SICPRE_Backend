const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
require('dotenv').config();

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET);
};

const decodeToken = (token) => {
    return jwt_decode(token);
};

module.exports = {
    generateToken,
    decodeToken
};