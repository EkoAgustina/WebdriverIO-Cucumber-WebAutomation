const {config} = require('./wdio.conf');
const args = require('yargs').argv;

const drivers = {
    chrome: { version: '112.0.5615.49' }, // https://chromedriver.chromium.org/
    firefox: { version: '0.32.1' }, // https://github.com/mozilla/geckodriver/releases
    chromiumedge: { version: '112.0.1722.39' } // https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/
}

config.capabilities = [
    {
        maxInstances: 5,
        browserName: args.browserName,
        acceptInsecureCerts: true
    }
];
config.services = [
    ['selenium-standalone', {
        logPath: 'logs',
        installArgs: { drivers }, // drivers to install
        args: { drivers } // drivers to use
    }]
]

config.cucumberOpts.tagExpression = args.cucumberTags;

exports.config = config;