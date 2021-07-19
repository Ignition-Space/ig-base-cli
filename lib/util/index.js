"use strict";
/*
 * @Author: Cookie
 * @Date: 2021-07-03 22:23:04
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-18 20:23:18
 * @Description:
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerError = exports.loggerSuccess = exports.loggerWarring = exports.loggerInfo = exports.loggerTiming = exports.getCwdPath = exports.getDirPath = void 0;
var path_1 = require("path");
var chalk_1 = __importDefault(require("chalk"));
// 项目本地路径
var getDirPath = function (relPath) {
    if (relPath === void 0) { relPath = ''; }
    return path_1.resolve(__dirname, relPath);
};
exports.getDirPath = getDirPath;
// 获取运行路径
var getCwdPath = function (relPath) {
    if (relPath === void 0) { relPath = ''; }
    return path_1.resolve(process.cwd(), relPath);
};
exports.getCwdPath = getCwdPath;
// 计时日志
var loggerTiming = function (str, start) {
    if (str === void 0) { str = ''; }
    if (start === void 0) { start = true; }
    if (start) {
        console.time('Timing');
        console.log(chalk_1.default.cyan("****** " + str + " START ******"));
    }
    else {
        console.log(chalk_1.default.cyan("****** " + str + " END ******"));
        console.timeEnd('Timing');
    }
};
exports.loggerTiming = loggerTiming;
// 普通日志
var loggerInfo = function (str) {
    if (str === void 0) { str = ''; }
    console.log(chalk_1.default.green("[INFO]\uFF1A " + str));
};
exports.loggerInfo = loggerInfo;
// 警告日志
var loggerWarring = function (str) {
    if (str === void 0) { str = ''; }
    console.log(chalk_1.default.yellowBright("[WARRING]\uFF1A " + str));
};
exports.loggerWarring = loggerWarring;
// 成功日志
var loggerSuccess = function (str) {
    if (str === void 0) { str = ''; }
    console.log(chalk_1.default.greenBright("[SUCCESS]\uFF1A " + str));
};
exports.loggerSuccess = loggerSuccess;
// 报错日志
var loggerError = function (str) {
    if (str === void 0) { str = ''; }
    console.log(chalk_1.default.redBright("[ERROR]\uFF1A " + str));
};
exports.loggerError = loggerError;
