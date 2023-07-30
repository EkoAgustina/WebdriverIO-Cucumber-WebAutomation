import { base_find } from './base_screen.js';

/**
 * Used as a base function to provide a Click action on an Element
 * @param {string} locator path element
 */
async function actionClick(locator){
    await base_find(locator).click()
}

export {
    actionClick
}