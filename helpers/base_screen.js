const { key_element } = require('../mappings/mapper');

/**
 * Used as a basic function to search for Elements
 * @param {string} locator path element
 */
const base_find = locator => {
    try {
        return $(key_element(locator))
    } catch (err) {
        throw err
    }
}

/**
 * Used as a basic function to take screenshot
 * @param {string} name screenshot name
 */
async function takeScreenshot(name){
   await browser.saveScreenshot('./screenshot/'+name+'.png')
}

module.exports = {
    base_find,
    takeScreenshot
}