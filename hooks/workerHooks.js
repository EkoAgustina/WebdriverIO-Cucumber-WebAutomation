import fs from 'node:fs/promises';
import { existsSync, readdirSync } from 'node:fs';
import { stdoutAnsiColor } from '../helpers/base_screen.js';
import globalVariables from '../resources/globalVariable.js';
import { SetPathCucumberHtmlReport } from '../config/report.conf.js'

function onPrepareHook(config) {
  globalVariables.cucumberTags = config.cucumberTags;
  var file = ['reporter/cucumber/jsonReport/', 'reporter/allure-results/'];
  for (var i = 0; i < file.length; i++) {
    if (existsSync(file[i])) {
      for (var a = 0; a < readdirSync(file[i]).length; a++) {
        var filePath = file[i] + readdirSync(file[i])[a];
        fs.rm(filePath, { recursive: true });
      }
    } else {
      console.log(stdoutAnsiColor('red', `your path report "${file[i]}" does not exist!`));
    }
  }
}

function onCompleteHook() {
  SetPathCucumberHtmlReport(globalVariables.cucumberTags)
}

export { onPrepareHook, onCompleteHook }