/**
 * Remove keys with undefined values from an object.
 *
 * @param {object} object The object to remove undefined
 * @return {object} The object without undefined
 */
const removeUndefined = (object) => {
  const cleanedObject = Object.keys(object).reduce((acc, key) => {
    const _acc = acc;
    if (object[key] !== undefined) _acc[key] = object[key];
    return _acc;
  }, {});

  Object.freeze(cleanedObject);

  return cleanedObject;
};

module.exports = {
  removeUndefined,
};
