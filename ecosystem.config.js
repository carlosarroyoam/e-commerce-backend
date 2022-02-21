module.exports = {
  apps: [
    {
      name: 'e-commerce-backend',
      script: './index.js',
      instances: 2,
      env_development: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
