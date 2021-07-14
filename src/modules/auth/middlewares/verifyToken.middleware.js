module.exports =
    ({ jsonwebtoken, authErrors, logger }) =>
    async (request, response, next) => {
        try {
            const { authorization } = request.headers;
            const accessToken = authorization && authorization.split(' ')[1];

            if (!accessToken) {
                const unauthorizedError = new authErrors.UnauthorizedError({
                    message: 'No token authorization provided',
                });

                return next(unauthorizedError);
            }

            const decoded = await jsonwebtoken.verify(accessToken);

            request.app.user = {
                id: decoded.sub,
                role: decoded.userRole,
            };

            next();
        } catch (err) {
            logger.log({
                level: 'info',
                message: err.message,
            });

            const forbiddenError = new authErrors.ForbiddenError({
                message: 'The provided token is not valid or the user has not access',
            });

            next(forbiddenError);
        }
    };
