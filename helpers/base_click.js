import { baseFind } from './base_screen.js';

/**
 * Used as a base function to provide a Click action on an Element
 * @param {string} locator path element
 */
async function actionClick (locator) {
  await baseFind(locator).click();
}

export { actionClick };
