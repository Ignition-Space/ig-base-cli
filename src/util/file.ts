/*
 * @Author: Cookie
 * @Date: 2021-07-18 19:14:43
 * @LastEditors: Cookie
 * @LastEditTime: 2021-08-13 11:15:12
 * @Description:
 */


const fs = require('fs');
import { loggerError, loggerSuccess } from './index'

export const loadFile = <T = {}>(path: string): T | false | undefined => {
  try {
    console.log(fs.existsSync(path), path)
    if (!fs.existsSync(path)) {
      return false
    }
    const data = fs.readFileSync(path, 'utf8');
    const config = JSON.parse(data);
    return config
  } catch (err) {
    loggerError(`Error reading file from disk: ${err}`);
  }
}

export const existsFile = (path: string) => {
  return new Promise((resolve, reject) => {
    fs.exists(path, (exists: boolean) => {
      if (exists) resolve(true)
      reject(false)
    })
  })
}

/**
 * @description: 写入文件
 * @param {string} path
 * @param {string} fileName
 * @param {string} file
 * @return {*}
 */
export const writeFile = (path: string, fileName: string, file: string) => {
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    fs.writeFile(`${path}/${fileName}`, file, (error: Error) => {
      if (error) {
        console.log(error)
        loggerError('Write file failed!')
      } else {
        loggerSuccess('Write file successful!')
      }
    })
  } catch (err) {
    loggerError(`Error reading file from disk: ${err}`);
  }
}
