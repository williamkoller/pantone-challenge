module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main.ts',
    '!<rootDir>/src/app.module.ts',
    '!<rootDir>/src/**/*module.ts',
    '!<rootDir>/src/shared/config/**',
    '!<rootDir>/src/shared/decorators/**',
    '!<rootDir>/src/shared/docs/**',
    '!<rootDir>/src/shared/http/**',
    '!<rootDir>/src/shared/ioc/**',
    '!<rootDir>/src/shared/middleware/**',
    '!<rootDir>/src/shared/guards/**',
    '!<rootDir>/src/shared/types/**',
    '!<rootDir>/src/shared/utils/**',
    '!<rootDir>/src/infrastructure/database/**',
    '!<rootDir>/src/application/dtos/**',
    '!<rootDir>/src/application/interfaces/**',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  testRegex: '.*\\.spec\\.ts$',
  moduleFileExtensions: ['js', 'json', 'ts'],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/$1',
  },
};
