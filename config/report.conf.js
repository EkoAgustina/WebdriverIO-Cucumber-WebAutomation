import globalVariables from '../resources/globalVariable.js';
let allureConfig = {
  outputDir: 'allure-results',
  disableWebdriverStepsReporting: true,
  disableWebdriverScreenshotsReporting: false,
  useCucumberStepReporter: true,
  addConsoleLogs: false,
  reportedEnvironmentVars: {
    OS: globalVariables.os
  },
};

let specConfig = {
  onlyFailures: false,
  addConsoleLogs: false,
  realtimeReporting: true,
};

export { specConfig, allureConfig };
