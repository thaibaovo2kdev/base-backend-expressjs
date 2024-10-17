const User = require('./routes/user');
module.exports = {
    '/api/v1/user/register': User.register,
    '/api/v1/user/login': User.login,
    
    '/api/v1/user/info': User.getInfo,
    '/api/v1/user/exp': User.updateExp,
    '/api/v1/user/coin': User.updateCoin,
    '/api/v1/user/money': User.updateMoney,
    '/api/v1/user/': User.update,
};
