const expressJwt = require('express-jwt');
const config = require('./config');
const User = require('../models/user');
// const pathToRegexp = require('path-to-regexp');

module.exports = jwt;

function jwt() {
    const secret = config.SECRET_KEY;
    return expressJwt({ secret, isRevoked }).unless({
        //Accept token for Login and register
        path: [
            '/api/v1/user/login',
            '/api/v1/user/register',
            // { url: /^\/api\/v1\/common\/metadata-token\/.*/, methods: ['GET'] },
            // pathToRegexp(('/api/v1/leaderboard/*'))
        ]
    });
}

async function isRevoked(req, payload, done) {

    const user = await User.findById(payload.sub);
    if (!user) {
        return done(null, true);
    }
    req.userId = user._id
    done();
};
