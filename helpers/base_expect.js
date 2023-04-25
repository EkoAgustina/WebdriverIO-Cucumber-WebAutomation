const {base_find} = require('./base_screen');
const { key_data } = require('../mappings/mapper');
const {actionGetText} = require('./base_get');

/**
 * Used to verify whether an element is displayed or not displayed
 * @param {string} locator path element
 * @param {string} condition Conditions for assertions
 */
async function element_displayed(locator,condition){
    const elDisplayed = await base_find(locator).isDisplayed()
    switch (condition){
        case 'is displayed':
            if (elDisplayed !== true){
                throw new Error(`Element ${elDisplayed}, not displayed`)
            }
            else{
                console.log(`Element ${elDisplayed}, is displayed`)
                return elDisplayed
            }
        case 'not displayed':
            if (elDisplayed !== false){
                throw new Error(`Element ${elDisplayed}, is displayed not as expected`)
            }
            else{
                console.log(`Element ${elDisplayed}, not displayed as expected`)
                return elDisplayed
            }
        default:
            throw new Error('Unknown conditions!')
    }

}


/**
 * Used to verify whether the value of the element matches the test data
 * @param {string} locator path element
 * @param {string} test_data path test data
 * @param {string} condition Conditions for assertions
 */
async function equal_data(condition,locator,test_data){
    switch (condition){
        case 'equal':
            await base_find(locator).waitUntil(async function () {
                return (await this.getText()) === key_data(test_data)
            }, {
                timeout: 5000,
                timeoutMsg: 'Your element \''+await actionGetText(locator)+'\' not equal with data \''+key_data(test_data)+'\''
            })
            break
        case 'not equal':
            await base_find(locator).waitUntil(async function () {
                return (await this.getText()) !== key_data(test_data)
            }, {
                timeout: 5000,
                timeoutMsg: 'Your element \''+await actionGetText(locator)+'\' is equal with data \''+key_data(test_data)+'\''
            })
            break
        default:
            throw new Error('Unknown conditions!')
    }
}

module.exports = {
    element_displayed,
    equal_data
}