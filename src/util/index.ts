/*
 * @Author: Cookie
 * @Date: 2021-07-03 22:23:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-07-30 10:55:26
 * @Description:
 */

import { resolve } from 'path'
import chalk from 'chalk'

// 项目本地路径
export const getDirPath = (relPath: string = '') => {
  return resolve(__dirname, relPath)
}

// 获取运行路径
export const getCwdPath = (relPath: string = '') => {
  return resolve(process.cwd(), relPath)
}

// 计时日志
export const loggerTiming = (str: string = '', start: boolean = true) => {
  if (start) {
    console.time('Timing')
    console.log(chalk.cyan(`****** ${str} START ******`))
  } else {
    console.log(chalk.cyan(`****** ${str} END ******`))
    console.timeEnd('Timing')
  }
}

type LogType = string | unknown

// 普通日志
export const loggerInfo = (str: LogType) => {
  console.log(chalk.green(`[INFO]： ${str}`));
}

// 警告日志
export const loggerWarring = (str: LogType) => {
  console.log(chalk.yellowBright(`[WARRING]： ${str}`));
}

// 成功日志
export const loggerSuccess = (str: LogType) => {
  console.log(chalk.greenBright(`[SUCCESS]： ${str}`));
}

// 报错日志
export const loggerError = (str: LogType) => {
  console.log(chalk.redBright(`[ERROR]： ${str}`));
}
