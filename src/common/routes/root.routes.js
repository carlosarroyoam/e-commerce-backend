import { Router } from 'express';
import packageJson from '../../../package.json' assert { type: 'json' };

export default () => {
  // eslint-disable-next-line new-cap
  const router = Router();

  router.get('/', (request, response) => {
    const APP_URL = `${request.protocol}://${request.headers.host}`;

    response.json({
      name: packageJson.name,
      description: packageJson.description,
      author: packageJson.author,
      version: packageJson.version,
      licence: packageJson.license,
      documentation: `${APP_URL}/api/v1/docs`,
    });
  });

  return router;
};
