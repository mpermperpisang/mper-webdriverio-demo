const { removeSync } = require('fs-extra');

const browserOptions = {
  args: [
    '--headless',
    '--disable-gpu',
  ],
};

exports.config = {
  runner: 'local',
  specs: ['../test/specs/**/*.spec.js'],
  capabilities: [{
    acceptInsecureCerts: true,
    browserName: 'chrome',
    'goog:chromeOptions': browserOptions,
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
