export const config = {
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
  reporters: ['spec'],
};

export default config;
