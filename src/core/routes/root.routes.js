import { Router } from 'express';
import packageJson from '../../../package.json' with { type: 'json' };

export default () => {
  // eslint-disable-next-line new-cap
  const router = Router();

  router.get('/', (request, response) =>
    response.status(200).json({
      name: packageJson.name,
      description: packageJson.description,
      author: packageJson.author,
      version: packageJson.version,
      licence: packageJson.license,
    }));

  return router;
};
