const stringUtils = require('../../utils/string.utils');

test('capitalize', () => {
    expect(stringUtils.capitalize('carlos')).toBe('Carlos');
});

test('capitalize a sentence', () => {
    expect(stringUtils.capitalizeWords('carlos alberto')).toBe(
        'Carlos Alberto'
    );
});
