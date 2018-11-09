module.exports = {
  collectCoverageFrom: [
    '**/*.{js}',
    '!**/index.js',
    '!**/*.mock.js',
    '!**/*.style.js',
    '!**/build/**',
    '!**/node_modules/**',
    '!**/public/**',
    '!**/src/reactor/**',
    '!App.js',
  ],
  coverageDirectory: 'build/coverage',
  coverageReporters: [
    'json',
    'text',
    'html',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/src/reactor/',
  ],
  preset: 'react-native',
  silent: false,
};
