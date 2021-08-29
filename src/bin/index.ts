#!/usr/bin/env node

/*
 * @Author: Cookie
 * @Date: 2021-07-03 22:28:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-29 21:31:20
 * @Description:
 */

import path from "path";
import alias from "module-alias";
alias(path.resolve(__dirname, "../../"));

import { Command } from 'commander';

import internallyCommand from './internally'

import { initExtraPack } from './extra'

const program = new Command(require('../../package').commandName);

export interface ICommand {
  version: string
  description: string
  command: string
  action: (value?: any) => void
}

const initCommand = (commandConfig: ICommand[]) => {
  commandConfig.forEach(config => {
    const { version, description, command, action } = config
    program
      .version(version)
      .description(description)
      .command(command)
      .action((value) => {
        action(value)
      })
  })
}


const init = () => {
  // const extraPacks = initExtraPack()
  // initCommand([...internallyCommand, ...extraPacks])
  initCommand([...internallyCommand])
}

init()

program.parse(process.argv);