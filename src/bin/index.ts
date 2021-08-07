#!/usr/bin/env node

/*
 * @Author: Cookie
 * @Date: 2021-07-03 22:28:14
 * @LastEditors: Cookie
 * @LastEditTime: 2021-08-07 13:37:58
 * @Description:
 */

require('module-alias/register')
import { Command } from 'commander';
import initGit from '@/inquirer/initGit';


const program = new Command();



import { execEslint, buildWebpack, buildRollup, devServerWebpack } from '../index'

/**
 * @description: eslint 检测
 * @param {*}
 * @return {*}
 */
program
  .version('0.1.0')
  .description('start eslint and fix code')
  .command('eslint')
  .action((value) => {
    execEslint()
  })

/**
 * @description: webpack 构建
 * @param {*}
 * @return {*}
 */
program
  .version('0.1.0')
  .description('start webpack build')
  .command('webpack')
  .action((value) => {
    const { NODE_ENV = 'development' } = process.env

    if (NODE_ENV === 'development') return devServerWebpack()

    buildWebpack()
  })

/**
 * @description: rollup 构建
 * @param {*}
 * @return {*}
 */
program
  .version('0.1.0')
  .description('start rollup build')
  .command('rollup')
  .action((value) => {
    buildRollup()
  })

/**
 * @description: 初始化 git 信息
 * @param {*}
 * @return {*}
 */
program
  .version('0.1.0')
  .description('git init')
  .command('git init')
  .action(() => {
    initGit()
  })

program.parse(process.argv);