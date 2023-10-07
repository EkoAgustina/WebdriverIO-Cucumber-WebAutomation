import globalVariables from '../resources/globalVariable.js';
import { config } from './wdio.conf.js';
import yargs from 'yargs';
const { argv } = yargs(process.argv);
let browserName = argv.browserName;

if (globalVariables.os === 'linux') {
  // globalVariables.services = 'docker';
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
  config.services = [];
} else {
  switch (browserName) {
    case 'headless':
      globalVariables.services = 'chromedriver';
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
      globalVariables.services = 'chromedriver';
      config.capabilities = [
        {
          maxInstances: 5,
          browserName: 'chrome',
          acceptInsecureCerts: true,
        },
      ];
      break;
    case 'firefox':
      globalVariables.services = 'firefox-profile';
      config.capabilities = [
        {
          maxInstances: 5,
          browserName: 'firefox',
          acceptInsecureCerts: true,
        },
      ];
      break;
    case 'MicrosoftEdge':
      globalVariables.services = 'edgedriver';
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
        args: ['--silent']
      },
    ],
  ];
}
config.cucumberOpts.tagExpression = argv.cucumberTags;

export default { config };
