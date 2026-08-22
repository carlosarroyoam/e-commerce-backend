import { Router } from 'express';

import sharedErrors from '#core/errors/index.js';

/**
 * Builds the catch-all router that forwards a ResourceNotFoundError for any unmatched route.
 *
 * @return {Router} The configured express.js router.
 */
export default () => {
  // eslint-disable-next-line new-cap
  const router = Router();

  router.all('*', (request, response, next) => {
    const route = request.originalUrl;
    const notFoundError = new sharedErrors.ResourceNotFoundError(
      `The ${route} route was not found on this server`
    );

    return next(notFoundError);
  });

  return router;
};
