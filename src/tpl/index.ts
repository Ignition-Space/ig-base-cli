/*
 * @Author: Cookie
 * @Date: 2021-08-12 22:01:01
 * @LastEditors: Cookie
 * @LastEditTime: 2021-08-13 00:15:52
 * @Description:
 */

import { loggerError, loggerSuccess, getDirPath, getCwdPath } from '@/util'
import { loadFile, writeFile } from '@/util/file'
import download from 'download-git-repo'

export interface ITpl {
  tplUrl: string
  name: string
  desc: string
}

/**
 * @description: 添加模板信息
 * @param {string} tplUrl
 * @param {string} name
 * @param {string} desc
 * @return {*}
 */

const cacheTpl = getDirPath('../cacheTpl')

export const updateTpl = async (tplUrl: string, name: string, desc: string) => {
  try {
    const tplConfig = loadFile<ITpl[]>(`${cacheTpl}/.tpl.json`)
    let file = [{
      tplUrl,
      name,
      desc
    }]
    if (tplConfig) {
      const isExist = tplConfig.some(tpl => tpl.name === name)
      if (isExist) {
        file = tplConfig.map(tpl => {
          if (tpl.name === name) {
            return {
              tplUrl,
              name,
              desc
            }
          }
          return tpl
        })
      } else {
        file = [
          ...tplConfig,
          ...file
        ]
      }
    }
    writeFile(cacheTpl, '.tpl.json', JSON.stringify(file, null, "\t"))
    loggerSuccess('Add Template Successful!')
  } catch (error) {
    loggerError(error)
  }
}

/**
 * @description: 获取模板列表
 * @param {*}
 * @return {*}
 */
export const getTplList = () => {
  try {
    const tplConfig = loadFile<ITpl[]>(`${cacheTpl}/.tpl.json`)
    if (tplConfig) {
      return tplConfig
    }
    loggerError('No template!')
  } catch (error) {
    loggerError(error)
  }
}

export const loadTpl = (name: string, tplUrl: string, path: string) => {

  download(`direct:${tplUrl}`, getCwdPath(`./${path}`), { clone: true }, (err: string) => {
    if (err) {
      loggerError(err)
    } else {
      loggerSuccess(`Download ${name} Template Successful!`)
    }
  })
}