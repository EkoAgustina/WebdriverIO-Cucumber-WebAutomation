import globalVariables from '../resources/globalVariable.js';
import { readdirSync } from 'node:fs';
import { generate } from 'multiple-cucumber-html-reporter';
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

function SetPathCucumberHtmlReport(Scenario) {
  var count = 0;
  const checkDirectories = new RegExp(Scenario)
  var htmlBasePath = 'reporter/cucumber/htmlReport/'
  for (var i = 0; i <= readdirSync(htmlBasePath).length; i++) {
    if (checkDirectories.exec(readdirSync(htmlBasePath)[i])) {
      count += 1;
    }
  }
  if (count === 0) {
    count += 1;
    generate({
      jsonDir: 'reporter/cucumber/jsonReport/',
      reportPath: htmlBasePath + Scenario + ' ' + count + '/',
    });
  }
  else {
    count += 1;
    generate({
      jsonDir: 'reporter/cucumber/jsonReport/',
      reportPath: htmlBasePath + Scenario + ' ' + count + '/',
    });
  }
}

export { specConfig, allureConfig, cucumberJsonConfig, SetPathCucumberHtmlReport };