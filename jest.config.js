const config = {
  moduleNameMapper: {
    '#common(.*)': '<rootDir>/src/common/$1',
    '#modules(.*)': '<rootDir>/src/modules/$1',
  },
};

export default config;
