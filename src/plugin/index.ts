/*
 * @Author: Cookie
 * @Description: 插件模块
 */

import { loggerError, loggerSuccess, getDirPath, getCwdPath, loggerWarring } from '@/util'
import { loadFile, writeFile } from '@/util/file'

export interface IPlugin {
  name: string
}

const cacheTpl = '.botyCache'

/**
 * @description: 添加插件信息
 * @param {IPlugin} params
 * @return {*}
 */
export const updatePlugin = async (params: IPlugin) => {
  const { name } = params
  let isExist = false
  try {
    const pluginConfig = loadFile<IPlugin[]>(`${cacheTpl}/.plugin.json`)
    let file = [{ name }]
    if (pluginConfig) {
      isExist = pluginConfig.some(tpl => tpl.name === name)
      if (!isExist) {
        file = [
          ...pluginConfig,
          { name }
        ]
      }
    }
    writeFile(cacheTpl, '.plugin.json', file)
    loggerSuccess(`${isExist ? 'Update' : 'Add'} Template Successful!`)
  } catch (error) {
    loggerError(error)
  }
}

/**
 * @description: 获取插件列表
 * @param {*}
 * @return {*}
 */
export const getPluginList = () => {
  try {
    const pluginConfig = loadFile<IPlugin[]>(`${cacheTpl}/.plugin.json`)
    if (pluginConfig) {
      return pluginConfig
    }
    return []
  } catch (error) {
    loggerError(error)
  }
}