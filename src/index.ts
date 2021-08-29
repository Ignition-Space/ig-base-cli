/*
 * @Author: Cookie
 * @Date: 2021-07-03 20:52:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-29 22:42:42
 * @Description:
 */

import { loggerError } from './util'
import { checkVersion as selfCheckVersion } from './util/npm'
import { getEslint } from './eslint'

import { buildWebpack as selfBuildWebpack, devServerWebpack as selfDevWebpack } from './build/webpack'
import { buildRollup as selfBuildRollup } from './build/rollup'

// eslint 校验
export const execEslint = async () => {
  await getEslint()
}

// webpack 构建
export const buildWebpack = async () => {
  try {
    await getEslint()
    await selfBuildWebpack()
  } catch (error) {
    loggerError(error)
  }
}

// webpack 开发
export const devServerWebpack = async () => {
  try {
    await selfDevWebpack()
  } catch (error) {
    loggerError(error)
  }
}

// rollup 构建
export const buildRollup = async () => {
  try {
    await getEslint()
    await selfBuildRollup()
  } catch (error) {
    loggerError(error)
  }
}


export const checkVersion = async () => {
  await selfCheckVersion()
}