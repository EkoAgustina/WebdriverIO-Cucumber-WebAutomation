import { platform } from 'node:process';

export default class globalVariables{
    static os = platform
    static hostName;
    static services;
    static urlBeforeStep;
    static urlAfterStep;
}
