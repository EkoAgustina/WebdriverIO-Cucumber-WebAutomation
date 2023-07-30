import { sleep } from '../helpers/base_screen.js';
import { pageLoad } from '../helpers/base_screen.js'
var urlBefore;

async function hookBeforeStep(step){
    if (step.text.includes('User open') !== true){
        return urlBefore = browser.getUrl()
    }
}

async function hookAfterStep(scenario,step,result){
    if(result.passed){
        console.log(
            `\x1b[33m ${scenario.name} \x1b[0m` + '\n'
            + ' '.repeat(scenario.name.length / 10.5)
            + `\x1b[33m ✓ ${step.text} \x1b[0m`
        )
        sleep(1)
        if(step.text.includes('User open') !== true){
            var currentUrl = browser.getUrl()
            if(await urlBefore !== await currentUrl){
                await pageLoad(5)
            }
        }
        sleep(1)
    }
}
async function hooksAfterScenario(world,result){
    if(result.error){
        await browser.saveScreenshot('./screenshot/'+world.gherkinDocument.feature.name+'Fail'+'.png')
    }
}

export {
    hookAfterStep,
    hooksAfterScenario,
    hookBeforeStep
}