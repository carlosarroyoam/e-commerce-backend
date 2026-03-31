import validators from '#core/utils/validators.util.js';

export default [validators.textInBody('product_title', { min: 3, max: 96 })];
