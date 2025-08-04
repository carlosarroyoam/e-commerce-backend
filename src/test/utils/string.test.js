import stringUtils from '#core/utils/string.utils.js';

describe('capitalize', () => {
  it('word to be capitalized', () => {
    expect(stringUtils.capitalize('carlos')).toBe('Carlos');
  });

  it('empty to be empty', () => {
    expect(stringUtils.capitalize('')).toBe('');
  });

  it('undefined to be empty', () => {
    expect(stringUtils.capitalize(undefined)).toBe('');
  });

  it('null to be empty', () => {
    expect(stringUtils.capitalize(null)).toBe('');
  });
});

describe('capitalizeWords', () => {
  it('sentence to be capitalized', () => {
    expect(stringUtils.capitalizeWords('carlos alberto')).toBe('Carlos Alberto');
  });

  it('empty to be empty', () => {
    expect(stringUtils.capitalizeWords('')).toBe('');
  });

  it('undefined to be empty', () => {
    expect(stringUtils.capitalizeWords(undefined)).toBe('');
  });

  it('null to be empty', () => {
    expect(stringUtils.capitalizeWords(null)).toBe('');
  });
});
