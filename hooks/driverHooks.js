import { sleep } from '../helpers/base_screen.js';
import { pageLoad } from '../helpers/base_screen.js';
import globalVariables from '../resources/globalVariable.js';
import propertiesReader from 'properties-reader'

async function hookBeforeStep(step) {
  if (step.text.includes('User open') !== true) {
    return (globalVariables.urlBeforeStep = await browser.getUrl());
  }
}

async function hookAfterStep(scenario, step, result) {
  globalVariables.urlAfterStep = await browser.getUrl();
  if (result.passed) {
    console.log(
      `\x1b[33m ${scenario.name} \x1b[0m` +
        '\n' +
        ' '.repeat(scenario.name.length / 10.5) +
        `\x1b[33m ✓ ${step.text} \x1b[0m`
    );
    sleep(1);
    if (step.text.includes('User open') !== true) {
      if (globalVariables.urlBeforeStep !== globalVariables.urlAfterStep) {
        await pageLoad(5);
      }
    }
    sleep(1);
  }
}
async function hooksAfterScenario(world, result) {
  var properties = propertiesReader(globalVariables.allureProperties, {
    writer: { saveSections: true },
  });
  properties.set('Services', globalVariables.services);
  properties.set('Host',globalVariables.hostName)
  properties.save(globalVariables.allureProperties);
  if (result.error) {
    await browser.saveScreenshot('./screenshot/' + world.gherkinDocument.feature.name + 'Fail' + '.png');
  }
}

export { hookAfterStep, hooksAfterScenario, hookBeforeStep };
