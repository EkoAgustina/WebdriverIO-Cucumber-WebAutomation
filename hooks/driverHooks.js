const sleep = require('sleep');
const allureReporter = require('@wdio/allure-reporter').default
const baseClass = require('../config/baseClass.conf')


function hookAfterStep(step,result){
    if(result.passed){
        console.log(`\x1b[33m ✓ ${step.text} is passed \x1b[0m`);
        sleep.sleep(2)
    }
}
async function hooksAfterScenario(world,result){
    if(result.error){
        await browser.saveScreenshot('./screenshot/'+world.gherkinDocument.feature.name+'Fail'+'.png')
    }
}
function hooksAfterTest(capabilities){
    const confService = JSON.parse(JSON.stringify(baseClass.config.services))
    const caps = JSON.parse(JSON.stringify(capabilities))
    allureReporter.addEnvironment(`${confService[0][0]} service`,caps.browserName)
}

module.exports = {
    hookAfterStep,
    hooksAfterScenario,
    hooksAfterTest,
}