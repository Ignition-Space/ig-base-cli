#!/usr/bin/env node

/*
 * @Author: Cookie
 * @Date: 2021-07-03 22:28:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-28 23:52:39
 * @Description:
 */

import path from "path";
import alias from "module-alias";
alias(path.resolve(__dirname, "../../"));

import { Command } from 'commander';

import internallyCommand from './internally'

const program = new Command(require('../../package').commandName);

interface ICommand {
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

initCommand(internallyCommand)

program.parse(process.argv);