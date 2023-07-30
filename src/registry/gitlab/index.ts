/*
 * @Author: Cookie
 * @Date: 2021-07-25 21:34:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-07-30 16:47:44
 * @Description:
 */

import { getToken } from './user'
import { loggerError, loggerSuccess } from '@/util'
import { writeFile } from '@/util/file'

/**
 * @description: 初始化 Git 信息
 * @param {string} gitUrl
 * @param {string} username
 * @param {string} password
 * @return {*}
 */
const gitLabInit = async (gitUrl: string, username: string, password: string) => {
  if (username && password) {
    try {
      const { access_token } = await getToken(gitUrl, username, password)
      writeFile('.girConfig', '.default.gitlab.config.json', {
        "GIT_Lab_URL": gitUrl,
        "GIT_Lab_TOKEN": access_token
      })
      loggerSuccess('Login Successful!')
    } catch (error) {
      loggerError(error)
    }
  }
}

export {
  gitLabInit,
}