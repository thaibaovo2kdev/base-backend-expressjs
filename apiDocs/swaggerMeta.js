const config = require("../configs/config");
module.exports = {
    openapi: '3.0.0',
    info: {
        title: 'Restful API Doc',
        version: '1.0.0',
        description:
            'restful Community System',
        license: {
            name: 'MIT',
            url: 'https://choosealicense.com/licenses/mit/'
        },
        
    },
    servers: [
        {
            url: `${config.DOMAIN}`,
            description: 'Server Community'
        }
    ]
};
