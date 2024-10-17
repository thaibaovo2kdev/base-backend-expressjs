module.exports = errorHandler;
const showError = require('../helpers/errorShowContent').default;
function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ isSuccess: false, statusCode: 400, error: showError(err, req.headers.lcode) });
    }

    // if (err.name === 'ValidationError') {
    //     // mongoose validation error
    //     return res.status(400).json({ isSuccess: false, statusCode: 400, error: showError('VALIDATION_ERROR', req.headers.lcode) });
    // }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ isSuccess: false, statusCode: 401, error: showError('UNAUTHORIZED', req.headers.lcode) });
    }

    // default to 500 server error
    return res.status(500).json({  isSuccess: false, statusCode: 500, error: showError(err.message, req.headers.lcode)});
}
