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
function loadYaml (path1,path2){
    let path = readFileSync('./resources/'+path1+'/'+path2+'.YAML')
    try{
        return load(path)
    } catch(err){
        throw new Error ('Failed to load YAML with original failed message: '+err.message)
    }
}

/**
 * Used to map Element paths
 * @param {string} locator path element
 */
function parse_element (locator) {
    let path1 = 'selector'
    let getkey = locator.split(':')
    let yamlData = loadYaml(path1,getkey[0])
    let key
    try{
        key = getkey[1]
        return get(yamlData,key)
    } catch(err){
        throw new Error('Element not found with original fail message: '+err.message)
    }
}

/**
 * Used to map Test Data or Local Data paths
 * @param {string} test_data path data
 */
function key_data (test_data) {
    let path1 = 'test_data'
    let getkey = test_data.split(':')
    let yamlData = loadYaml(path1,getkey[0])
    let key
    try{
        key = getkey[1]
        console.log(get(yamlData,key))
        return get(yamlData,key)
    } catch(err){
        throw new Error('Test data not found with original fail message: '+err.message)
    }
}

/**
 * Used to map Element paths
 * @param {string} locator path element
 */
function key_element(locator){
    let parse_key = parse_element(locator).split(' => ')
    let cond = parse_key[0]
    let key = parse_key[1]
    let key_cond

    switch(cond){
        case 'By.xpath':
            console.log('By.xpath: ',key)
            return key
        case 'By.id':
            key_cond = "id="+key
            console.log('By.id: ',key_cond)
            return key_cond
        case 'By.accessibility_id':
            key_cond = "~"+key
            console.log('By.accessibility_id: ',key_cond)
            return key_cond
        default:
            throw new Error('Unknown selector!')
    }
}

export {
    key_element,
    key_data
}