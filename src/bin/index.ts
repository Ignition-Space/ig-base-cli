#!/usr/bin/env node

/*
 * @Author: Cookie
 * @Date: 2021-07-03 22:28:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-25 10:51:50
 * @Description:
 */

// require('module-alias/register')

import path from "path";
import alias from "module-alias";
alias(path.resolve(__dirname, "../../"));

import { Command } from 'commander';
import inquirer from '@/inquirer';

const { initGit, addTpl, selectTpl } = inquirer

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


/**
 * @description: 添加模板
 * @param {*}
 * @return {*}
 */
program
  .version('0.1.0')
  .description('add tpl')
  .command('add tpl')
  .action(() => {
    addTpl()
  })


/**
 * @description: 初始化模板
 * @param {*}
 * @return {*}
 */
program
  .version('0.1.0')
  .description('init tpl')
  .command('init tpl')
  .action(() => {
    selectTpl()
  })



program.parse(process.argv);