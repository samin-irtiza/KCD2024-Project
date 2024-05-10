const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
    // check header
    // let token;

    // if (
    //     req.headers.authorization &&
    //     req.headers.authorization.startsWith('Bearer')
    // ) {
    //     // Set token from Bearer token in header
    //     token = req.headers.authorization.split(' ')[1];
    //     // Set token from cookie
    // }
    // else if (req.cookies.token) {
    //     token = req.cookies.token;
    // }
    
    // if (!token) {
    //     throw new UnauthenticatedError('Authentication invalid');
    // }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication invalid')
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // attach the user to the job routes 
        // const testUser = payload.userId === '64c7962f3d85cdecda86ba24';

        req.user = { userId: payload.userId, name: payload.name};

        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid');
    }
}

module.exports = auth;
