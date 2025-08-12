module.exports = {
  testEnvironment: 'node',
  testTimeout: 20000,
  clearMocks: true,
  restoreMocks: true,
  setupFiles: ['dotenv/config'],
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle: 'Mock User Auth – Test Report',
      outputPath: 'reports/report.html',
      includeConsoleLog: true
    }]
  ]
};
