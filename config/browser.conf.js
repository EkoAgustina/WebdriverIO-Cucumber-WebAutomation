const { platform  } = require('node:process');
const {config} = require('./wdio.conf');
const yargs = require('yargs').argv;
let browserName = yargs.browserName;
const browserConfig = () => {
    if (platform === 'linux'){
        config.capabilities = [
            {
                maxInstances: 5,
                browserName: 'chrome',
                'goog:chromeOptions': {
                    args: [
                        '--headless',
                        '--no-sandbox',
                        '--disable-gpu'
                    ]
                },
                acceptInsecureCerts: true
            }
        ]
        config.services =[
            'docker',[{
                logFileName: 'wdio-docker.log', // >> your log file name
                outputDir: 'docker-logs',             // >> this will overwrite config.outputDir
                args: ['--silent']
            }]
        ]
    }
    else {
        const drivers = {
            chrome: { version: '114.0.5735.90' }, // https://chromedriver.chromium.org/
            firefox: { version: '0.32.1' }, // https://github.com/mozilla/geckodriver/releases
            chromiumedge: { version: '114.0.1823.18' } // https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/
        }
        switch (browserName){
            case 'headless':
                config.capabilities = [
                    {
                        maxInstances: 5,
                        browserName: 'chrome',
                        'goog:chromeOptions': {
                            args: ['headless', 'disable-gpu']
                        },
                        acceptInsecureCerts: true
                    }
                ]
                break;
            case 'chrome':
                config.capabilities = [
                    {
                        maxInstances: 5,
                        browserName: 'chrome',
                        acceptInsecureCerts: true
                    }
                ]
                break;
            case 'firefox':
                config.capabilities = [
                    {
                        maxInstances: 5,
                        browserName: 'firefox',
                        acceptInsecureCerts: true
                    }
                ]
                break;
            case 'MicrosoftEdge':
                config.capabilities = [
                    {
                        maxInstances: 5,
                        browserName: 'MicrosoftEdge',
                        acceptInsecureCerts: true
                    }
                ]
                break;
            default:
                throw new Error(`Condition ${browserName}, condition not recognized!`)
        }

        config.services = [
            ['selenium-standalone', {
                logFileName: 'logs',
                installArgs:{drivers},
                args: {drivers}
            }]
        ]
    }
}

config.cucumberOpts.tagExpression = yargs.cucumberTags;

exports.config = config,browserConfig();