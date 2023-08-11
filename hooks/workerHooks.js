import { cleanDirectory } from '../helpers/base_screen.js';
import globalVariables from '../resources/globalVariable.js';
import { SetPathCucumberHtmlReport } from '../config/report.conf.js'

function onPrepareHook(config) {
  globalVariables.cucumberTags = config.cucumberTags;
  var cPath = ['reporter/cucumber/jsonReport/', 'reporter/allure-results/'];
  cleanDirectory(cPath)
}

function onCompleteHook() {
  SetPathCucumberHtmlReport(globalVariables.cucumberTags)
}

export { onPrepareHook, onCompleteHook }