/**
 * Remove keys with undefined values from an object.
 *
 * @param {object} object The object to remove undefined
 * @return {object} The object without undefined
 */
const removeUndefined = (object) => {
  const cleanObject = Object.keys(object).reduce((acc, [key, value]) => {
    if (value) {
      acc[key] = value;
    }

    return acc;
  });

  Object.freeze(cleanObject);

  return cleanObject;
};

module.exports = {
  removeUndefined,
};
