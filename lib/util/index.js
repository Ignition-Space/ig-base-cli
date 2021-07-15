"use strict";
/*
 * @Author: Cookie
 * @Date: 2021-07-03 22:23:04
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-04 13:37:49
 * @Description:
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.failed = exports.success = exports.countTime = exports.getCwdPath = exports.getDirPath = void 0;
var path_1 = require("path");
var chalk_1 = __importDefault(require("chalk"));
var getDirPath = function (relPath) {
    if (relPath === void 0) { relPath = ''; }
    return path_1.resolve(__dirname, relPath);
};
exports.getDirPath = getDirPath;
var getCwdPath = function (relPath) {
    if (relPath === void 0) { relPath = ''; }
    return path_1.resolve(process.cwd(), relPath);
};
exports.getCwdPath = getCwdPath;
var countTime = function (str, start) {
    if (str === void 0) { str = ''; }
    if (start === void 0) { start = true; }
    if (start) {
        console.time('Timing');
        console.log("****** " + str + " START ******");
    }
    else {
        console.log("****** " + str + " END ******");
        console.timeEnd('Timing');
    }
};
exports.countTime = countTime;
var success = function (str) {
    if (str === void 0) { str = ''; }
    console.log(chalk_1.default.greenBright(str));
};
exports.success = success;
var failed = function (str) {
    if (str === void 0) { str = ''; }
    console.log(chalk_1.default.redBright(str));
};
exports.failed = failed;
