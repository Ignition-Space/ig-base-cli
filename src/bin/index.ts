#!/usr/bin/env node

/*
 * @Author: Cookie
 * @Date: 2021-07-03 22:28:14
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-19 16:25:41
 * @Description:
 */

require('module-alias/register')
import { Command } from 'commander';
const program = new Command();

import { execEslint, buildWebpack, buildRollup, devServerWebpack } from '../index'

program
  .version('0.1.0')
  .description('start eslint and fix code')
  .command('eslint')
  .action((value) => {
    execEslint()
  })

program
  .version('0.1.0')
  .description('start webpack build')
  .command('webpack')
  .action((value) => {
    const { NODE_ENV = 'development' } = process.env

    if (NODE_ENV === 'development') return devServerWebpack()

    buildWebpack()
  })


program
  .version('0.1.0')
  .description('start rollup build')
  .command('rollup')
  .action((value) => {
    buildRollup()
  })


program.parse(process.argv);