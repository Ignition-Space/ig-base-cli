/*
 * @Author: Cookie
 * @Date: 2021-07-03 22:23:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-07-30 15:02:35
 * @Description:
 */

import { resolve } from 'path'

// 项目本地路径
export const getDirPath = (relPath: string = '') => {
  return resolve(__dirname, relPath)
}

// 获取运行路径
export const getCwdPath = (relPath: string = '') => {
  return resolve(process.cwd(), relPath)
}

export { loggerSuccess, loggerTiming, loggerError, loggerInfo, loggerWarring } from './logger'