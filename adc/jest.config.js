module.exports = {
  roots: [
    './tests',
  ],
  moduleDirectories: [
    'node_modules',
    './src',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  setupFiles: ['./tests/test-bundler.js'],
  setupTestFrameworkScriptFile: "mock-local-storage",
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
  ],
  coverageReporters: ['json', 'lcov', 'text-summary'],
  globals: {
    __DEV__: true,
  },
}
