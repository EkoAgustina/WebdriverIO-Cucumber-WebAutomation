import { load } from 'js-yaml';
import { readFileSync } from 'fs';
import pkg from 'lodash';
const { get } = pkg;

/**
 * Used to read and parse YAML files.
 * So that it can be used to put Locator, Element, Test Data and others
 * @param {string} path1 path to folder yml file
 * @param {string} path2 path to yml file
 */
function loadYaml (path1, path2) {
  const path = readFileSync('./resources/' + path1 + '/' + path2 + '.YAML');
  try {
    return load(path);
  } catch (err) {
    throw new Error('Failed to load YAML with original failed message: ' + err.message);
  }
}

/**
 * Used to map Element paths
 * @param {string} locator path element
 */
function parseElement (locator) {
  const path1 = 'selector';
  const getkey = locator.split(':');
  const yamlData = loadYaml(path1, getkey[0]);
  let key;
  try {
    key = getkey[1];
    return get(yamlData, key);
  } catch (err) {
    throw new Error('Element not found with original fail message: ' + err.message);
  }
}

/**
 * Used to map Test Data or Local Data paths
 * @param {string} testData path data
 */
function keyData (testData) {
  const path1 = 'test_data';
  const getkey = testData.split(':');
  const yamlData = loadYaml(path1, getkey[0]);
  let key;
  try {
    key = getkey[1];
    console.log(get(yamlData, key));
    return get(yamlData, key);
  } catch (err) {
    throw new Error('Test data not found with original fail message: ' + err.message);
  }
}

/**
 * Used to map Element paths
 * @param {string} locator path element
 */
function keyElement (locator) {
  const parseKey = parseElement(locator).split(' => ');
  const cond = parseKey[0];
  const key = parseKey[1];
  let keyCond;

  switch (cond) {
    case 'By.xpath':
      console.log('By.xpath: ', key);
      return key;
    case 'By.id':
      keyCond = 'id=' + key;
      console.log('By.id: ', keyCond);
      return keyCond;
    case 'By.accessibility_id':
      keyCond = '~' + key;
      console.log('By.accessibility_id: ', keyCond);
      return keyCond;
    default:
      throw new Error('Unknown selector!');
  }
}

export { keyElement, keyData };
