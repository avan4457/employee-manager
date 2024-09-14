export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  setupFiles: ['./jest.setup.ts'],
  collectCoverageFrom: ['<rootDir>/tests/**/*.test.ts', '<rootDir>/**/*.spec.ts', '!node_modules/**'],
  testMatch: ['<rootDir>/tests/**/*.test.ts', '<rootDir>/**/*.spec.ts'],
}
