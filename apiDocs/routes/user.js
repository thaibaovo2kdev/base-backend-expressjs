module.exports = {
    login: {
        post: {
            tags: ['User'],
            summary: 'User required email, password',
            produces: ['application/json'],
            consumes: ['application/json'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { 
                            type: 'object',
                            properties: {
                                email: {
                                    type: 'string',
                                    example: 'abc@gmail.com',
                                },
                                password: {
                                    type: 'string',
                                    example: 'abc@-123',
                                },
                             }
                        }
                    }
                }
                
            },
            responses: {
                '200': {
                    description: 'User login successfully, with API access token provided.'
                },
                '401': {
                    description: 'Auth failed with an incorrect password.'
                },
                '404': {
                    description: 'This user account is not found.'
                },
                '500': {
                    description: 'Internal server error.'
                }
            }
        }
    },
    register: {
        post: {
            tags: ['User'],
            summary: 'User required email, password',
            produces: ['application/json'],
            consumes: ['application/json'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { 
                            type: 'object',
                            properties: {
                                email: {
                                    type: 'string',
                                    example: 'abc@gmail.com',
                                },
                                password: {
                                    type: 'string',
                                    example: 'abc@-123',
                                },
                             }
                        }
                    }
                }
                
            },
            responses: {
                '200': {
                    description: 'User login successfully, with API access token provided.'
                },
                '401': {
                    description: 'Auth failed with an incorrect password.'
                },
                '404': {
                    description: 'This user account is not found.'
                },
                '500': {
                    description: 'Internal server error.'
                }
            }
        }
    },
    getInfo: {
        get: {
            tags: ['User'],
            summary: '',
            produces: ['application/json'],
            consumes: ['application/json'],
            requestBody: {
                required: false,
                
            },
            security: [{ bearerAuth: [] }],
            responses: {
                '200': {
                    description: 'User get info successfully, with API access token provided.'
                },
                '401': {
                    description: 'Auth failed with an incorrect password.'
                },
                '404': {
                    description: 'This user account is not found.'
                },
                '500': {
                    description: 'Internal server error.'
                }
            }
        }
    },
    updateExp: {
        put: {
            tags: ['User'],
            summary: '',
            produces: ['application/json'],
            consumes: ['application/json'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { 
                            type: 'object',
                            properties: {
                                exp: {
                                    type: 'number',
                                    example: 100,
                                },
                             }
                        }
                    }
                }
                
            },
            security: [{ bearerAuth: [] }],
            responses: {
                '200': {
                    description: 'User sync successfully, with API access token provided.'
                },
                '400': {
                    description: 'Internal server error.'
                },
               
            }
        }
    },
    updateMoney: {
        put: {
            tags: ['User'],
            summary: '',
            produces: ['application/json'],
            consumes: ['application/json'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { 
                            type: 'object',
                            properties: {
                                money: {
                                    type: 'number',
                                    example: 100,
                                },
                             }
                        }
                    }
                }
                
            },
            security: [{ bearerAuth: [] }],
            responses: {
                '200': {
                    description: 'User sync successfully, with API access token provided.'
                },
                '400': {
                    description: 'Internal server error.'
                },
               
            }
        }
    },
    
    update: {
        put: {
            tags: ['User'],
            summary: '',
            produces: ['application/json'],
            consumes: ['application/json'],
            requestBody: {
                required: false,
                content: {
                    'application/json': {
                        schema: { 
                            type: 'object',
                            properties: {
                                
                                exp: {
                                    type: 'number',
                                    example: 100,
                                },
                                money: {
                                    type: 'number',
                                    example: 100,
                                },
                                coin: {
                                    type: 'number',
                                    example: 100,
                                },
                                money: {
                                    type: 'number',
                                    example: 100,
                                },
                                gameData: {
                                    type: 'string',
                                    example: "abc",
                                },
                             }
                        }
                    }
                }
                
            },
            security: [{ bearerAuth: [] }],
            responses: {
                '200': {
                    description: 'User sync successfully, with API access token provided.'
                },
                '400': {
                    description: 'Internal server error.'
                },
               
            }
        }
    },
      
};
