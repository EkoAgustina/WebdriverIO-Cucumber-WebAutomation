import { baseOpenBrowser, takeScreenshot } from '../../helpers/base_screen.js';
import { actionClick } from '../../helpers/base_click.js';
import { actionFill } from '../../helpers/base_fill.js';
import { elementDisplayed, equalData } from '../../helpers/base_expect.js';
import { Given, When, Then } from '@wdio/cucumber-framework';

Given(/^User open "(.*)"$/, async (url) => {
  await baseOpenBrowser(url);
});

When(/^User click "(.*)"$/, async (locator) => {
  await actionClick(locator);
});

Then(/^Fill "(.*)" with data "(.*)"$/, async (locator, localData) => {
  await actionFill(locator, localData);
});

Then(/^Element "(.*)" (is displayed|not displayed)$/, async (locator, condition) => {
  await elementDisplayed(locator, condition);
});

Then(/^Element \"(.*)\" is (equal|not equal) with data \"(.*)\"$/, async (locator, condition, testData) => {
  await equalData(condition, locator, testData);
});

Then(/^User take screenshot with file name "(.*)"$/, async (name) => {
  await takeScreenshot(name);
});
