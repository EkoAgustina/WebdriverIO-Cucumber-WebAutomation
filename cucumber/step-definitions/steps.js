import { base_openBrowser, takeScreenshot } from '../../helpers/base_screen.js';
import { actionClick } from '../../helpers/base_click.js';
import { actionFill } from '../../helpers/base_fill.js';
import { element_displayed, equal_data } from '../../helpers/base_expect.js';
import { Given, When, Then } from '@wdio/cucumber-framework';

Given(/^User open "(.*)"$/, async (url) => {
    await base_openBrowser(url)
});

When(/^User click "(.*)"$/, async (locator) =>{
    await actionClick(locator)
});

Then(/^Fill "(.*)" with data "(.*)"$/, async (locator,local_data) =>{
    await actionFill(locator,local_data)
});

Then(/^Element "(.*)" (is displayed|not displayed)$/, async (locator,condition) =>{
    await element_displayed(locator,condition)
});

Then(/^Element \"(.*)\" is (equal|not equal) with data \"(.*)\"$/, async (locator,condition,test_data) =>{
    await equal_data(condition,locator,test_data)
});

Then(/^User take screenshot with file name "(.*)"$/, async (name) =>{
    // sleep.sleep(5);
    await takeScreenshot(name)
});