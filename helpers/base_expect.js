import { base_find } from './base_screen.js';
import { key_data, key_element } from '../mappings/mapper.js';
import { actionGetText } from './base_get.js';

/**
 * Used to verify whether an element is displayed or not displayed
 * @param {string} locator path element
 * @param {string} condition Conditions for assertions
 */
function element_displayed(locator, condition) {
  return new Promise(async (resolve, reject) => {
    const elDisplayed = await base_find(locator).isDisplayed();
    switch (condition) {
      case 'is displayed':
        if (elDisplayed !== true) {
          setTimeout(() => {
            reject(new Error(`Element ${key_element(locator)}, not displayed`));
          }, 3000);
        } else {
          setTimeout(() => {
            console.log(`Element ${key_element(locator)}, is displayed`);
            resolve(elDisplayed);
          });
        }
        break;
      case 'not displayed':
        if (elDisplayed !== false) {
          setTimeout(() => {
            reject(new Error(`Element ${key_element(locator)}, is displayed not as expected`));
          }, 3000);
        } else {
          setTimeout(() => {
            console.log(`Element ${key_element(locator)}, not displayed as expected`);
            resolve(elDisplayed);
          }, 3000);
        }
        break;
      default:
        reject(new Error('Unknown conditions!'));
    }
  });
}

/**
 * Used to verify whether the value of the element matches the test data
 * @param {string} locator path element
 * @param {string} test_data path test data
 * @param {string} condition Conditions for assertions
 */
async function equal_data(condition, locator, test_data) {
  switch (condition) {
    case 'equal':
      await base_find(locator).waitUntil(
        async function () {
          return (await this.getText()) === key_data(test_data);
        },
        {
          timeout: 5000,
          timeoutMsg:
            "Your element '" + (await actionGetText(locator)) + "' not equal with data '" + key_data(test_data) + "'",
        }
      );
      break;
    case 'not equal':
      await base_find(locator).waitUntil(
        async function () {
          return (await this.getText()) !== key_data(test_data);
        },
        {
          timeout: 5000,
          timeoutMsg:
            "Your element '" + (await actionGetText(locator)) + "' is equal with data '" + key_data(test_data) + "'",
        }
      );
      break;
    default:
      throw new Error('Unknown conditions!');
  }
}

export { element_displayed, equal_data };
