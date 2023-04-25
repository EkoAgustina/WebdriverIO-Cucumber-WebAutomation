const sleep = require('sleep');
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
module.exports = {
    hookAfterStep,
    hooksAfterScenario
}