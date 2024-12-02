const expressJwt = require('express-jwt');
const config = require('./config');
const Admin = require('../models/admin');
// const pathToRegexp = require('path-to-regexp');

module.exports = jwt;

function jwt() {
    const secret = config.SECRET_KEY;
    return expressJwt({ secret, isRevoked }).unless({
        //Accept token for Login and register
        path: [
            '/api/v1/admin/login',
            '/api/v1/admin/register',
            // { url: /^\/api\/v1\/common\/metadata-token\/.*/, methods: ['GET'] },
            // pathToRegexp(('/api/v1/leaderboard/*'))
        ]
    });
}

async function isRevoked(req, payload, done) {

    const admin = await Admin.findById(payload.sub);
    if (!admin) {
        return done(null, true);
    }
    req.adminId = admin._id
    done();
};
