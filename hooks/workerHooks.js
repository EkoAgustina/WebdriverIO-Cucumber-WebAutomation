import { cleanDirectory } from '../helpers/base_screen.js';
import { SetPathCucumberHtmlReport } from '../config/report.conf.js'
import { env } from 'process';

function onPrepareHook(config) {
  // env.cucumberTagExpression = config.cucumberTags;
  var cPath = ['reporter/cucumber/jsonReport/', 'reporter/allure-results/'];
  cleanDirectory(cPath)
}

function onCompleteHook() {
  SetPathCucumberHtmlReport(env.cucumberTagExpression)
}

export { onPrepareHook, onCompleteHook }