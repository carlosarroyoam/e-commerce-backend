module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  plugins: ['prettier', 'security'],
  extends: ['google', 'prettier', 'plugin:security/recommended'],
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    camelcase: 0,
  },
};
