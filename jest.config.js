const config = {
  moduleNameMapper: {
    '#common(.*)': '<rootDir>/src/core/$1',
    '#modules(.*)': '<rootDir>/src/modules/$1',
  },
};

export default config;
