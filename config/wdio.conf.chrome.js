const { driver } = require('@wdio/globals');
const { removeSync } = require('fs-extra');

require('dotenv').config();

const browserOptions = {
  args: ['--window-size=1920,1080',
    '--no-sandbox',
    '--disable-gpu',
    '--incognito',
    '--disk-cache-size=256',
    '--log-level=2',
    '--enable-auto-reload',
  ],
};

exports.config = {
  runner: 'local',
  capabilities: [{
    specs: [
      '../test/features/scenarios/*_web/**/*.feature',
    ],
    maxInstances: parseInt(process.env.INSTANCES, 10) || 2,
    browserName: 'chrome',
    'goog:chromeOptions': browserOptions,
    acceptInsecureCerts: true,
  }],
  services: ['devtools'],
  logLevel: 'error',
  baseUrl: process.env.BASE_WEB,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'cucumber',
  reporters: [
    ['allure', {
      outputDir: './allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false,
      useCucumberStepReporter: true,
      addConsoleLogs: true,
    }],
  ],
  cucumberOpts: {
    require: ['./test/features/step_definitions/login_steps.js'],
    backtrace: true,
    dryRun: false,
    failFast: false,
    format: ['pretty'],
    snippets: true,
    source: true,
    strict: false,
    tagExpression: '',
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
    scenarioLevelReporter: false,
    retry: 0,
    failAmbiguousDefinitions: true,
  },
  onPrepare: () => {
    removeSync('./allure-results/');
    removeSync('./allure-report/');
  },
  async afterStep(result) {
    if (!result.passed) {
      await driver.takeScreenshot();
    }
  },
};
