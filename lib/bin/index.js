#!/usr/bin/env node
"use strict";
/*
 * @Author: Cookie
 * @Date: 2021-07-03 22:28:14
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-04 14:16:56
 * @Description:
 */
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var program = new commander_1.Command();
var eslint_1 = require("../eslint");
var webpack_1 = require("../build/webpack");
program
    .version('0.1.0')
    .description('start eslint and fix code')
    .command('eslint')
    .action(function (value) {
    eslint_1.getEslint();
});
program
    .version('0.1.0')
    .description('start eslint and fix code')
    .command('webpack')
    .action(function (value) {
    webpack_1.buildWebpack();
});
program.parse(process.argv);
