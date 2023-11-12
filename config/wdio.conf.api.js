const { removeSync } = require('fs-extra');

exports.config = {
  runner: 'local',
  specs: ['../test/specs/**/*.spec.js'],
  capabilities: [{
    acceptInsecureCerts: true,
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: [
        '--headless',
        '--disable-gpu',
      ],
    },
  }],
  logLevel: 'error',
  framework: 'mocha',
  reporters: [
    ['allure', {
      outputDir: './allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false,
      useCucumberStepReporter: false,
      addConsoleLogs: true,
    }],
  ],
  onPrepare: () => {
    removeSync('./allure-results/');
    removeSync('./allure-report/');
  },
};
