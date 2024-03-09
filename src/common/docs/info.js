import packageJson from '../../../package.json' assert { type: 'json' };

export default {
  openapi: '3.0.1',
  info: {
    title: packageJson.name,
    description: packageJson.description,
    contact: {
      email: 'carlosarroyoam@gmail.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
    },
    version: packageJson.version,
  },
};
