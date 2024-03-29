import fs from 'node:fs/promises';
import { existsSync, readdirSync } from 'node:fs';
import cucumberJson from 'wdio-cucumberjs-json-reporter';
import { key_element } from '../mappings/mapper.js';
import globalVariables from '../resources/globalVariable.js';

/**
 * Used as a basic function to search for Elements
 * @param {string} locator path element
 */
const base_find = (locator) => {
  try {
    return $(key_element(locator));
  } catch (err) {
    throw err;
  }
};

function sleep(duration) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < duration * 1000);
}

/**
 * Used as basic function to open browser
 * @param {string} url
 */
async function base_openBrowser(url) {
  await browser.url(url);

  if (globalVariables.os === 'win32') {
    await browser.maximizeWindow();
  }
  sleep(5);
}

/**
 * @param {int} duration
 */
async function pageLoad(duration) {
  await browser.waitUntil(() => browser.execute(() => document.readyState === 'complete'), {
    timeout: duration * 1000,
    timeoutMsg: 'Page failed to load',
  });
}

/**
 * Used as a basic function to take screenshot
 * @param {string} name screenshot name
 */
async function takeScreenshot(name) {
  await browser.saveScreenshot('./screenshot/' + name + '.png');
  cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
}

/**
 * Current date format dd-mm-yy
 */
function getCurrentDate() {
  const today = new Date();
  let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
  return date;
}

/**
 * @param {string} color text color in stdout
 * @param {string} message message in stdout
 */
var stdoutAnsiColor = (color, message) => {
  if (color === 'red') {
    return '\x1b[31m' + message + '\x1b[0m';
  } else if (color === 'yellow') {
    return '\x1b[33m' + message + '\x1b[0m';
  }
};

/**
 * @param {string} directoryPath
 */
function cleanDirectory(directoryPath){
  for (var i = 0; i < directoryPath.length; i++) {
    if (existsSync(directoryPath[i])) {
      for (var a = 0; a < readdirSync(directoryPath[i]).length; a++) {
        var filePath = directoryPath[i] + readdirSync(directoryPath[i])[a];
        fs.rm(filePath, { recursive: true });
      }
    } else {
      console.log(stdoutAnsiColor('red', `Warning: your path report "${directoryPath[i]}" does not exist!`));
    }
  }
}

export { base_find, takeScreenshot, sleep, base_openBrowser, pageLoad, stdoutAnsiColor, getCurrentDate, cleanDirectory };
