const {config} = require('./wdio.conf');
const yargs = require('yargs').argv;

config.capabilities = [
    {
        maxInstances: 5,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--disable-gpu','--disable-dev-shm-usage']
        },
        acceptInsecureCerts: true
    }
]
config.services =[]


config.cucumberOpts.tagExpression = yargs.cucumberTags;

exports.config = config;