module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '@assets(.*)$': '<rootDir>/src/assets/$1',
    '@components(.*)$': '<rootDir>/src/components/$1',
    '@constants(.*)$': '<rootDir>/src/constants/$1',
    '@handlers(.*)$': '<rootDir>/src/handlers/$1',
    '@router(.*)$': '<rootDir>/src/router/$1',
    '@store(.*)$': '<rootDir>/src/store/$1',
    '@templates(.*)$': '<rootDir>/src/templates/src/$1',
    '@unit(.*)$': '<rootDir>/tests/unit/$1',
    '@va-auth(.*)$': '<rootDir>/src/va-auth/src/$1',
    '@validators(.*)$': '<rootDir>/src/validators/src/$1',
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testURL: 'http://localhost/'
}
