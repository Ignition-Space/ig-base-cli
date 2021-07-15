#!/usr/bin/env node

/*
 * @Author: Cookie
 * @Date: 2021-07-03 22:28:14
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-04 14:16:56
 * @Description:
 */


import { Command } from 'commander';
const program = new Command();

import { getEslint } from '../eslint'
import { buildWebpack } from '../build/webpack'


program
  .version('0.1.0')
  .description('start eslint and fix code')
  .command('eslint')
  .action((value) => {
    getEslint()
  })

program
  .version('0.1.0')
  .description('start eslint and fix code')
  .command('webpack')
  .action((value) => {
    buildWebpack()
  })

program.parse(process.argv);