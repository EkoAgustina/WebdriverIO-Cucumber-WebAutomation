import globalVariables from '../resources/globalVariable.js';
import { config } from './wdio.conf.js';
import yargs from 'yargs';
const { argv } = yargs(process.argv);
let browserName = argv.browserName;

if (globalVariables.os === 'linux') {
  globalVariables.services = 'docker';
  config.capabilities = [
    {
      maxInstances: 5,
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--headless', '--no-sandbox', '--disable-gpu'],
      },
      acceptInsecureCerts: true,
    },
  ];
  config.services = [
    globalVariables.services,
    [
      {
        logFileName: 'wdio-docker.log',
        outputDir: 'docker-logs',
        args: ['--silent'],
      },
    ],
  ];
} else {
  globalVariables.services = 'selenium-standalone';
  const drivers = {
    chrome: { version: '114.0.5735.90' },
    firefox: { version: '0.32.1' },
    chromiumedge: { version: '114.0.1823.18' },
  };
  switch (browserName) {
    case 'headless':
      config.capabilities = [
        {
          maxInstances: 5,
          browserName: 'chrome',
          'goog:chromeOptions': {
            args: ['headless', 'disable-gpu'],
          },
          acceptInsecureCerts: true,
        },
      ];
      break;
    case 'chrome':
      config.capabilities = [
        {
          maxInstances: 5,
          browserName: 'chrome',
          acceptInsecureCerts: true,
        },
      ];
      break;
    case 'firefox':
      config.capabilities = [
        {
          maxInstances: 5,
          browserName: 'firefox',
          acceptInsecureCerts: true,
        },
      ];
      break;
    case 'MicrosoftEdge':
      config.capabilities = [
        {
          maxInstances: 5,
          browserName: 'MicrosoftEdge',
          acceptInsecureCerts: true,
        },
      ];
      break;
    default:
      throw new Error(`Condition ${browserName}, condition not recognized!`);
  }

  config.services = [
    [
      globalVariables.services,
      {
        logFileName: 'logs',
        installArgs: { drivers },
        args: { drivers },
      },
    ],
  ];
}
config.cucumberOpts.tagExpression = argv.cucumberTags;

export default { config };
