const baseScreen = require('../../helpers/base_screen');
const {actionClick} = require('../../helpers/base_click');
const {actionFill} = require('../../helpers/base_fill');
const assertion = require('../../helpers/base_expect');
const { Given, When, Then } = require('@wdio/cucumber-framework');

Given(/^User open "(.*)"$/, async (url) => {
    await browser.url(url);
    await browser.maximizeWindow();
    // sleep.sleep(3);
});

When(/^User click "(.*)"$/, async (locator) =>{
    await actionClick(locator)
});

Then(/^Fill "(.*)" with data "(.*)"$/, async (locator,local_data) =>{
    await actionFill(locator,local_data)
});

Then(/^Element "(.*)" (is displayed|not displayed)$/, async (locator,condition) =>{
    await assertion.element_displayed(locator,condition)
});

Then(/^Element \"(.*)\" is (equal|not equal) with data \"(.*)\"$/, async (locator,condition,test_data) =>{
    await assertion.equal_data(condition,locator,test_data)
});

Then(/^User take screenshot with file name "(.*)"$/, async (name) =>{
    // sleep.sleep(5);
    await baseScreen.takeScreenshot(name)
});