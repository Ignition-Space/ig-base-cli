/*
 * @Author: Cookie
 * @Date: 2021-08-12 22:01:01
 * @LastEditors: Cookie
 * @LastEditTime: 2021-08-13 12:08:12
 * @Description:
 */

import { loggerError, loggerSuccess, getDirPath, getCwdPath, loggerWarring } from '@/util'
import { loadFile, writeFile } from '@/util/file'
import download from 'download-git-repo'
export interface ITpl {
  tplUrl: string
  name: string
  desc: string
  org?: string
  downloadUrl?: string
  apiUrl?: string
}

const cacheTpl = getDirPath('../cacheTpl')

/**
 * @description: 添加模板信息
 * @param {ITpl} params
 * @return {*}
 */
export const updateTpl = async (params: ITpl) => {
  const { tplUrl, name, desc } = params
  const { pathname } = new URL(tplUrl)
  let isExist = false
  try {
    const reTpl: ITpl = {
      tplUrl,
      name,
      desc
    }
    if (tplUrl.includes('github.com')) {
      reTpl.org = pathname.substring(1)
      reTpl.downloadUrl = 'https://codeload.github.com'
      reTpl.apiUrl = 'https://api.github.com'
    }

    const tplConfig = loadFile<ITpl[]>(`${cacheTpl}/.tpl.json`)
    let file = [reTpl]
    if (tplConfig) {
      isExist = tplConfig.some(tpl => tpl.name === name)
      if (isExist) {
        file = tplConfig.map(tpl => {
          if (tpl.name === name) {
            return reTpl
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
    loggerSuccess(`${isExist ? 'Update' : 'Add'} Template Successful!`)
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
    loggerWarring('No template! Please add template first!')
    process.exit(1)
  } catch (error) {
    loggerError(error)
  }
}

export const loadTpl = (name: string, downloadUrl: string, path: string) => {
  download(`direct:${downloadUrl}`, getCwdPath(`./${path}`), (err: string) => {
    if (err) {
      loggerError(err)
    } else {
      loggerSuccess(`Download ${name} Template Successful!`)
    }
  })
}