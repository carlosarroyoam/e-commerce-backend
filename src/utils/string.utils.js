/**
 * Capitalizes the first char of string.
 *
 * @param {string} string The string to capitalize
 * @return {string} The capitalized string
 */
const capitalize = (string) => {
    if (typeof string !== 'string') return '';

    return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Capitalizes every word in a string.
 *
 * @param {string} string
 * @return {string}
 */
const capitalizeWords = (string) => {
    if (typeof string !== 'string') return '';

    const words = string.toLowerCase().split(' ');

    const capitalizedWords = words
        .map((word) => capitalize(word))
        .filter((word) => word.trim() !== '');

    return capitalizedWords.join(' ').toString();
};

module.exports = {
    capitalize,
    capitalizeWords,
};
