const stringUtils = require('./string.utils');

const capitalizeWords = (string) => {
  if (typeof string !== 'string') return '';

  const words = string.toLowerCase().split(' ');

  const capitalizedWords = words.map((word) => stringUtils.capitalize(word));

  return capitalizedWords.join(' ').toString();
};

module.exports = {
  capitalizeWords,
};
