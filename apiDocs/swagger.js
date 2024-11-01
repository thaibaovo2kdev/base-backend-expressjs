const meta = require('./swaggerMeta');
const paths = require('./paths');
const components = require('./components');

module.exports = {
    openapi: meta.openapi,
    info: {
        title: meta.info.title,
        version: meta.info.version,
        description: meta.info.description,
        license: {
            name: meta.info.license.name,
            url: meta.info.license.url
        },
        
    },
    servers: meta.servers,
    paths: paths,
    components: components
};
