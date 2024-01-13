import { baseFind } from './base_screen.js';
import { keyData } from '../mappings/mapper.js';

/**
 * Used as a base function to provide a fill action
 * @param {string} locator path test data
 * @param {string} localData path user input
 */
async function actionFill (locator, localData) {
  await baseFind(locator).setValue(keyData(localData));
}

export { actionFill };
