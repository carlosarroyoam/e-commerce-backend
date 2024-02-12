module.exports = {
	parserOptions: {
		ecmaVersion: 2021,
		sourceType: 'module',
	},
	env: {
		commonjs: true,
		es2021: true,
		node: true,
	},
	plugins: ['prettier'],
	extends: ['eslint:recommended', 'plugin:prettier/recommended'],
};
