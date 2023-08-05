import { base_find } from './base_screen.js';
import { key_data } from '../mappings/mapper.js';

/**
 * Used as a base function to provide a fill action
 * @param {string} locator path test data
 * @param {string} local_data path user input
 */
async function actionFill(locator, local_data) {
  await base_find(locator).setValue(key_data(local_data));
}

export { actionFill };
