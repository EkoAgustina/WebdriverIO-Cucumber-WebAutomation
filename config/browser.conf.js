import globalVariables from '../resources/globalVariable.js';
import { config } from './wdio.conf.js';
import yargs from "yargs";
const { argv } = yargs(process.argv);
let browserName = argv.browserName;

    if (globalVariables.os === 'linux'){
        globalVariables.services = 'docker'
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
            globalVariables.services,[{
                logFileName: 'wdio-docker.log', // >> your log file name
                outputDir: 'docker-logs',             // >> this will overwrite config.outputDir
                args: ['--silent']
            }]
        ]
    }
    else {
        globalVariables.services = 'selenium-standalone'
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
            [globalVariables.services, {
                logFileName: 'logs',
                installArgs:{drivers},
                args: {drivers}
            }]
        ]
    }
config.reporters = [
    [
        "spec",
        {
            onlyFailures: false,
            addConsoleLogs: false,
            realtimeReporting: true,
        },
    ],[
        'allure',
    {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        useCucumberStepReporter: true,
        addConsoleLogs: false,
        reportedEnvironmentVars: {
            OS: globalVariables.os,
            Services: globalVariables.services,
            Host: globalVariables.hostName
        }
    }
    ]
]
config.cucumberOpts.tagExpression = argv.cucumberTags;

export default {config}