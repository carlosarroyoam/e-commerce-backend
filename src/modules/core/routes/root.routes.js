const { Router } = require('express');

module.exports = ({ config }) => {
    const router = Router();

    router.get('/', (request, response) => {
        const APP_URL = `${config.APP_URL}:${config.PORT}`;

        response.send({
            version: '0.1.0-snapshot',
            documentation: `${APP_URL}/api/v1/docs`,
            author: 'carlosarroyoam',
            resources: {
                users: {
                    paths: [
                        {
                            name: 'index',
                            path: `${APP_URL}/api/v1/users`,
                        },
                        {
                            name: 'show',
                            path: `${APP_URL}/api/v1/users/[id]`,
                        },
                    ],
                },
                admins: {
                    paths: [
                        {
                            name: 'index',
                            path: `${APP_URL}/api/v1/admins`,
                        },
                        {
                            name: 'show',
                            path: `${APP_URL}/api/v1/admins/[id]`,
                        },
                    ],
                },
            },
        });
    });

    return router;
};
