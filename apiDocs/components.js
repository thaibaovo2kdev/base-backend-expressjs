module.exports = {
    schemas: {
        Login: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    format: 'string',
                    example: 'abc.app@gmail.com',
                    description: 'abc.app@gmail.com'
                },
                password: {
                    type: 'string',
                    description: 'adsId-123',
                    example: 'ads-123',
                },
                
            },
            required: ['email', 'password']
        },
    },
    securitySchemes: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
        }
    }
};
