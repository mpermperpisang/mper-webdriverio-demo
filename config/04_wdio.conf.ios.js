const fs = require('fs');
const { removeSync } = require('fs-extra');

require('dotenv').config();

const port = Math.floor(1000 + Math.random() * 9999);

exports.config = {
  runner: 'local',
  specs: [
    '../test/features/scenarios/*_ios/**/*.feature',
  ],
  maxInstances: 1,
  capabilities: [{
    platformName: 'iOS',
    'appium:automationName': 'XCUITest',
    'appium:app': process.env.APP,
    'appium:deviceName': process.env.DEVICE,
    'appium:platformVersion': process.env.PLATFORM_VERSION,
    'appium:appWaitDuration': parseInt(process.env.APP_WAIT_DURATION, 10) || 60,
    'appium:fullReset': process.env.FULL_RESET || false,
    'appium:noReset': process.env.NO_RESET || true,
    'appium:resetOnSessionStartOnly': process.env.RESET_ON_SESSION_START_ONLY || true,
    'appium:newCommandTimeout': parseInt(process.env.NEW_COMMAND_TIMEOUT, 10) || 60,
    'appium:waitforTimeout': parseInt(process.env.WAIT_FOR_TIMEOUT, 10) || 60000,
    'appium:commandTimeout': parseInt(process.env.COMMAND_TIMEOUT, 10) || 60000,
    'appium:autoWebview': process.env.AUTO_WEBVIEW || true,
    'appium:autoGrantPermissions': process.env.AUTO_GRANT_PERMISSION || true,
    'appium:autoAcceptAlerts': process.env.AUTO_ACCEPT_ALERTS || true,
    'appium:autoDismissAlerts': process.env.AUTO_DISMISS_ALERTS || true,
    'appium:locationServicesEnabled': process.env.LOCATION_SERVICES_ENABLED || true,
  }],
  logLevel: process.env.LOG || 'error',
  connectionRetryTimeout: parseInt(process.env.CONN_RETRY_TIMEOUT, 10) || 60000,
  connectionRetryCount: parseInt(process.env.CONN_RETRY_COUNT, 10) || 3,
  services: [
    [
      'appium',
      {
        args: {
          port,
          sessionOverride: true,
          debugLogSpacing: true,
        },
        command: 'appium',
        waitStartTime: process.env.WAIT_START_TIME,
      },
    ],
  ],
  framework: 'cucumber',
  specFileRetries: parseInt(process.env.SPEC_FILE_RETRIES, 10) || 0,
  reporters: [['allure', {
    outputDir: './allure-results',
    disableWebdriverStepsReporting: false,
    disableWebdriverScreenshotsReporting: false,
    useCucumberStepReporter: true,
    addConsoleLogs: true,
  }]],
  cucumberOpts: {
    require: ['./test/features/step_definitions/*_ios/**/*.js'],
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: false,
    format: ['pretty'],
    snippets: true,
    source: true,
    profile: [],
    strict: false,
    timeout: 100000,
    retry: 0,
    random: true,
    forbidPending: true,
    failAmbiguousDefinitions: true,
    ignoreUndefinedDefinitions: false,
  },
  onPrepare: () => {
    fs.access(process.env.APP, fs.F_OK, (err) => {
      if (err) {
        throw err;
      }
    });

    removeSync('./allure-results/');
    removeSync('./allure-report/');
  },
  afterStep: async ({ error }) => {
    if (error) {
      await browser.takeScreenshot();
    }
  },
};
