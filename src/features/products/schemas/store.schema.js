import validators from '#core/utils/validators.util.js';

export default [validators.textInBody('title', { min: 3, max: 96 })];
