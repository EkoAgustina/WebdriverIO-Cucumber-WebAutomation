import { baseFind } from './base_screen.js';
import { keyData, keyElement } from '../mappings/mapper.js';
import { actionGetText } from './base_get.js';

/**
 * Used to verify whether an element is displayed or not displayed
 * @param {string} locator path element
 * @param {string} condition Conditions for assertions
 */
function elementDisplayed (locator, condition) {
  return new Promise(async (resolve, reject) => {
    const elDisplayed = await baseFind(locator).isDisplayed();
    switch (condition) {
      case 'is displayed':
        if (elDisplayed !== true) {
          setTimeout(() => {
            reject(new Error(`Element ${keyElement(locator)}, not displayed`));
          }, 3000);
        } else {
          setTimeout(() => {
            console.log(`Element ${keyElement(locator)}, is displayed`);
            resolve(elDisplayed);
          });
        }
        break;
      case 'not displayed':
        if (elDisplayed !== false) {
          setTimeout(() => {
            reject(new Error(`Element ${keyElement(locator)}, is displayed not as expected`));
          }, 3000);
        } else {
          setTimeout(() => {
            console.log(`Element ${keyElement(locator)}, not displayed as expected`);
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
 * @param {string} testData path test data
 * @param {string} condition Conditions for assertions
 */
async function equalData (condition, locator, testData) {
  switch (condition) {
    case 'equal':
      await baseFind(locator).waitUntil(
        async function () {
          return (await this.getText()) === keyData(testData);
        },
        {
          timeout: 5000,
          timeoutMsg:
            "Your element '" + (await actionGetText(locator)) + "' not equal with data '" + keyData(testData) + "'"
        }
      );
      break;
    case 'not equal':
      await baseFind(locator).waitUntil(
        async function () {
          return (await this.getText()) !== keyData(testData);
        },
        {
          timeout: 5000,
          timeoutMsg:
            "Your element '" + (await actionGetText(locator)) + "' is equal with data '" + keyData(testData) + "'"
        }
      );
      break;
    default:
      throw new Error('Unknown conditions!');
  }
}

export { elementDisplayed, equalData };
