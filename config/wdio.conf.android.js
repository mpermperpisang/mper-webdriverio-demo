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
    'appium:app': process.env.APP,
    'appium:noReset': process.env.NO_RESET,
    'appium:fullReset': process.env.FULL_RESET,
    'appium:dontStopAppOnReset': process.env.DONT_STOP_APP_ON_RESET,
    'appium:newCommandTimeout': process.env.NEW_COMMAND_TIMEOUT,
    'appium:autoGrantPermissions': process.env.AUTO_GRANT_PERMISSIONS,
    'appium:avd': process.env.AVD,
    'appium:avdLaunchTimeout': process.env.AVD_LAUNCH_TIMEOUT,
    'appium:avdReadyTimeout': process.env.AVD_READY_TIMEOUT,
  }],
  logLevel: process.env.LOG,
  connectionRetryTimeout: process.env.CONN_RETRY_TIMEOUT,
  connectionRetryCount: process.env.CONN_RETRY_COUNT,
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
  specFileRetries: process.env.SPEC_FILE_RETRIES,
  reporters: [['allure', {
    outputDir: './allure-results',
    disableWebdriverStepsReporting: false,
    disableWebdriverScreenshotsReporting: false,
    useCucumberStepReporter: true,
    addConsoleLogs: true,
  }]],
  cucumberOpts: {
    require: ['./test/features/step_definitions/**/*.js'],
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
    // NOTE check if .app exists
    fs.access(process.env.APP, fs.F_OK, (err) => {
      if (err) {
        throw err;
      }
    });

    removeSync('./allure-results/');
    removeSync('./allure-report/');
  },
  beforeScenario: async () => {
    await browser.pause(5000);
  },
  afterStep: async ({ error }) => {
    if (error) {
      await browser.takeScreenshot();
    }
  },
  afterHook: async () => {
    await browser.pause(3000);
    await browser.removeApp(process.env.BUNDLE_ID);
  },
};
