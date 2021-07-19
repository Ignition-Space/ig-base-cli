/*
 * @Author: Cookie
 * @Date: 2021-07-03 20:52:44
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-19 16:25:33
 * @Description:
 */

import { loggerError } from './util'
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
