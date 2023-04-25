const {base_find} = require('./base_screen');


/**
 * Used as base get function
 * @param {string} locator path element
 */
async function actionGetText(locator){
    const textValue = await base_find(locator).getText()

    if(textValue === '' || textValue === null){
        throw new Error('Text Not Found')
    }
    else{
        console.log('Its value: ',textValue)
        return textValue
    }
}

module.exports = {
    actionGetText
}