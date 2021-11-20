export default {
  moduleFileExtensions: ['ts', 'js'],
  verbose: true,
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  rootDir: '../',
  setupFiles: ['./tests/setEnvVars.ts'],
  testTimeout: 10000,
};
