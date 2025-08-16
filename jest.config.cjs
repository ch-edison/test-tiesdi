module.exports = {
  preset: 'react-native',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/__mocks__/',
    'node_modules/(?!(react-native|@react-native|@react-native-async-storage/async-storage|react-native-fast-image)/)',
  ],
  moduleNameMapper: {
    '^react-native/jest/mock$': '<rootDir>/__mocks__/rn-jest-mock.js',
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
};