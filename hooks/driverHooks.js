const allureReporter = require('@wdio/allure-reporter').default
const baseClass = require('../config/baseClass.conf')
const bs = require('../helpers/base_screen')


function hookAfterStep(step,result){
    if(result.passed){
        console.log(`\x1b[33m ✓ ${step.text} is passed \x1b[0m`);
        bs.sleep(5000)
    }
}
async function hooksAfterScenario(world,result){
    if(result.error){
        await browser.saveScreenshot('./screenshot/'+world.gherkinDocument.feature.name+'Fail'+'.png')
    }
}

module.exports = {
    hookAfterStep,
    hooksAfterScenario
}