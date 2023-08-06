import globalVariables from '../resources/globalVariable.js';
let allureConfig = {
  outputDir: 'reporter/allure-results',
  disableWebdriverStepsReporting: true,
  disableWebdriverScreenshotsReporting: false,
  useCucumberStepReporter: true,
  addConsoleLogs: false,
  reportedEnvironmentVars: {
    OS: globalVariables.os,
  },
};

let specConfig = {
  onlyFailures: false,
  addConsoleLogs: false,
  realtimeReporting: true,
};

let cucumberJsonConfig = {
  disableHooks: false,
  jsonFolder: 'reporter/cucumber/jsonReport/',
  language: 'en',
};

export { specConfig, allureConfig, cucumberJsonConfig };
