const { key_element } = require('../mappings/mapper');
const { platform  } = require('node:process');

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

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }


/**
 * Used as basic function to open browser
 * @param {string} url
 */
async function base_openBrowser(url){
    await browser.url(url)

    if (platform === 'win32'){
        await browser.maximizeWindow()
    }
    sleep(5000)
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
    takeScreenshot,
    sleep,
    base_openBrowser
}