import { platform } from 'node:process';
export default class globalVariables {
  static os = platform;
  static hostName;
  static services;
  static cucumberTags;
  static urlBeforeStep;
  static urlAfterStep;
  static allureProperties = './reporter/allure-results/environment.properties';
}
