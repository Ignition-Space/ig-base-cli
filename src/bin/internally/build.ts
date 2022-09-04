/*
 * @Author: Cookie
 * @Description: 构建相关
 */

import { buildWebpack, buildRollup, devServerWebpack, analysisWebpack } from '@/index'

/**
 * @description: webpack 构建
 * @param {*}
 * @return {*}
 */

export const webpackDevCommand = {
  description: 'start webpack build',
  command: 'start',
  action: () => {
    devServerWebpack()
  }
}

export const webpackBuildCommand = {
  description: 'start webpack build',
  command: 'build',
  action: () => {
    buildWebpack()
  }
}

export const webpackAnalysisCommand = {
  description: 'start webpack bundle analysis',
  command: 'analysis',
  action: () => {
    analysisWebpack()
  }
}

/**
* @description: rollup 构建
* @param {*}
* @return {*}
*/
export const rollupCommand = {
  description: 'start rollup build',
  command: 'rollup:dev',
  action: () => buildRollup()
}

export default [
  webpackDevCommand,
  webpackBuildCommand,
  webpackAnalysisCommand,
  rollupCommand
]
