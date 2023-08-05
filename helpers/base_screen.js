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
}

export { base_find, takeScreenshot, sleep, base_openBrowser, pageLoad };
