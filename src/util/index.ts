/*
 * @Author: Cookie
 * @Date: 2021-07-03 22:23:04
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-04 13:37:49
 * @Description:
 */

import { resolve } from 'path'
import chalk from 'chalk'

export const getDirPath = (relPath: string = '') => {
  return resolve(__dirname, relPath)
}


export const getCwdPath = (relPath: string = '') => {
  return resolve(process.cwd(), relPath)
}


export const countTime = (str: string = '', start: boolean = true) => {
  if (start) {
    console.time('Timing')
    console.log(`****** ${str} START ******`)
  } else {
    console.log(`****** ${str} END ******`)
    console.timeEnd('Timing')
  }
}

export const success = (str: string = '') => {
  console.log(chalk.greenBright(str))
}


export const failed = (str: string = '') => {
  console.log(chalk.redBright(str))
}