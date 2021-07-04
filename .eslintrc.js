module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    parser: 'babel-eslint', // This line is required to fix "unexpected token" errors
    plugins: ['security'],
    extends: ['google', 'prettier', 'plugin:security/recommended'],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        camelcase: 0,
    },
};
