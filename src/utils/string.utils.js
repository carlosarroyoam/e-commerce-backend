/**
 * Capitalizes a the first char of string.
 *
 * @param {string} string The string to capitalize
 * @return {string} The capitalized string
 */
const capitalize = (string) => {
    if (typeof string !== 'string') return '';

    return string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports = {
    capitalize,
};
