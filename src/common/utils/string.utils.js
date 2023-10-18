/**
 * Capitalizes the first char of string.
 *
 * @param {string} string The string to capitalize
 * @return {string} The capitalized string
 */
function capitalize(string) {
	if (typeof string !== 'string') return '';

	return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Capitalizes every word in a string.
 *
 * @param {string} string
 * @return {string}
 */
function capitalizeWords(string) {
	if (typeof string !== 'string') return '';

	const words = string.toLowerCase().split(' ');

	const capitalizedWords = words
		.map((word) => capitalize(word))
		.filter((word) => word.trim() !== '');

	return capitalizedWords.join(' ').toString();
}

/**
 * Returns a slugify string.
 *
 * @param {string} string
 * @return {string}
 */
function slugify(string) {
	if (typeof string !== 'string') return '';

	const words = string.toLowerCase().split(' ');

	const wordsWithoutSymbols = words
		.map((word) =>
			word
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.replace(/[^a-zA-Z0-9]/g, '')
		)
		.filter((word) => word.trim() !== '');

	return wordsWithoutSymbols.join('-').toString();
}

export default {
	capitalize,
	capitalizeWords,
	slugify,
};
