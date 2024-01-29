const fs = require('fs');
const { removeSync } = require('fs-extra');

require('dotenv').config();

const port = Math.floor(1000 + Math.random() * 9999);

exports.config = {
  runner: 'local',
  specs: [
    '../test/features/scenarios/*_android/**/*.feature',
  ],
  maxInstances: 1,
  capabilities: [{
    platformName: 'Android',
    'appium:udid': process.env.UDID,
    'appium:automationName': 'UiAutomator2',
    'appium:app': process.env.APK,
    'appium:noReset': process.env.NO_RESET || true,
    'appium:fullReset': process.env.FULL_RESET || false,
    'appium:dontStopAppOnReset': process.env.DONT_STOP_APP_ON_RESET || true,
    'appium:newCommandTimeout': parseInt(process.env.NEW_COMMAND_TIMEOUT, 10) || 60,
    'appium:autoGrantPermissions': process.env.AUTO_GRANT_PERMISSIONS || true,
    'appium:avd': process.env.AVD,
    'appium:avdLaunchTimeout': parseInt(process.env.AVD_LAUNCH_TIMEOUT, 10) || 125000,
    'appium:avdReadyTimeout': parseInt(process.env.AVD_READY_TIMEOUT, 10) || 125000,
  }],
  logLevel: process.env.LOG || 'error',
  connectionRetryTimeout: parseInt(process.env.CONN_RETRY_TIMEOUT, 10) || 125000,
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
        waitStartTime: parseInt(process.env.WAIT_START_TIME, 10) || 10000,
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
    require: ['./test/features/step_definitions/*_android/**/*.js'],
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
