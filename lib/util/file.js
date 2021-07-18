"use strict";
/*
 * @Author: Cookie
 * @Date: 2021-07-18 19:14:43
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-18 19:22:34
 * @Description:
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFile = void 0;
var fs = require('fs');
var loadFile = function (path) {
    try {
        var data = fs.readFileSync(path, 'utf8');
        var config = JSON.parse(data);
        return config;
    }
    catch (err) {
        console.log("Error reading file from disk: " + err);
    }
};
exports.loadFile = loadFile;
