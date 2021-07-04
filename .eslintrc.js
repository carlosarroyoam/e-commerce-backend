module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true,
    },
    plugins: ['security'],
    extends: ['google', 'prettier', 'plugin:security/recommended'],
    parserOptions: {
        ecmaVersion: 6,
    },
    rules: {
        camelcase: 0,
    },
};
