module.exports = {
  parserOptions: {
    ecmaVersion: 2021,
  },
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
};
