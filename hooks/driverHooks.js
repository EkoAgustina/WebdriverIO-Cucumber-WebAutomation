import { sleep } from '../helpers/base_screen.js';
import cucumberJson from 'wdio-cucumberjs-json-reporter';
import { pageLoad, stdoutAnsiColor } from '../helpers/base_screen.js';
import globalVariables from '../resources/globalVariable.js';
import propertiesReader from 'properties-reader';

async function hookBeforeStep(step) {
  if (step.text.includes('User open') !== true) {
    return (globalVariables.urlBeforeStep = await browser.getUrl());
  }
}

async function hookAfterStep(scenario, step, result) {
  globalVariables.urlAfterStep = await browser.getUrl();
  if (result.passed) {
    console.log(
      stdoutAnsiColor('yellow', scenario.name) +
        '\n' +
        ' '.repeat(scenario.name.length / 10.5) +
        stdoutAnsiColor('yellow', `✓ ${step.text}`)
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
  if (typeof(globalVariables.services) != 'undefined') {
    properties.set('Services', globalVariables.services);
  }
  properties.set('Host', globalVariables.hostName);
  properties.save(globalVariables.allureProperties);
  if (result.error) {
    await browser.saveScreenshot('./screenshot/' + world.gherkinDocument.feature.name + 'Fail' + '.png');
    cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
  }
}

export { hookAfterStep, hooksAfterScenario, hookBeforeStep };
