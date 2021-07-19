#!/usr/bin/env node
"use strict";
/*
 * @Author: Cookie
 * @Date: 2021-07-03 22:28:14
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-19 16:25:41
 * @Description:
 */
Object.defineProperty(exports, "__esModule", { value: true });
require('module-alias/register');
var commander_1 = require("commander");
var program = new commander_1.Command();
var index_1 = require("../index");
program
    .version('0.1.0')
    .description('start eslint and fix code')
    .command('eslint')
    .action(function (value) {
    index_1.execEslint();
});
program
    .version('0.1.0')
    .description('start webpack build')
    .command('webpack')
    .action(function (value) {
    var _a = process.env.NODE_ENV, NODE_ENV = _a === void 0 ? 'development' : _a;
    if (NODE_ENV === 'development')
        return index_1.devServerWebpack();
    index_1.buildWebpack();
});
program
    .version('0.1.0')
    .description('start rollup build')
    .command('rollup')
    .action(function (value) {
    index_1.buildRollup();
});
program.parse(process.argv);
