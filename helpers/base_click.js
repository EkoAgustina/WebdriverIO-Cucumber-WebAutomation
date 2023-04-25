const {base_find} = require('./base_screen');

/**
 * Used as a base function to provide a Click action on an Element
 * @param {string} locator path element
 */
async function actionClick(locator){
    await base_find(locator).click()
}

module.exports = {
    actionClick
}