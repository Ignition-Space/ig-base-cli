#!/usr/bin/env node

/*
 * @Author: Cookie
 * @Date: 2021-07-03 22:28:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-04 17:39:47
 * @Description:
 */

import path from "path";
import alias from "module-alias";
const packageConfig = require("../../package.json")

alias(path.resolve(__dirname, "../../"));

import { Command } from 'commander';

import internallyCommand from './internally'

import { initExtraPack } from './extra'

const program = new Command(packageConfig.commandName);

export interface ICommand {
  description: string
  command: string
  action: (value?: any) => void
}

const initCommand = (commandConfig: ICommand[]) => {
  commandConfig.forEach(config => {
    const { description, command, action } = config
    program
      .version(packageConfig.version)
      .description(description)
      .command(command)
      .action((value) => {
        action(value)
      })
  })
}

const init = () => {
  const extraPacks = initExtraPack()
  initCommand([...internallyCommand, ...extraPacks])
}

init()

program.parse(process.argv);
