/*
 * @Author: Cookie
 * @Date: 2021-07-18 19:14:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-07-30 16:57:00
 * @Description: 文件操作类
 */

import fs from 'fs-extra'
import os from 'os'
import { resolve } from 'path';
import { register } from 'ts-node';
import { loggerError, loggerSuccess, loggerInfo } from './logger'
import { getCwdPath, getDirPath } from '@/util';

export const loadFile = <T = {}>(path: string, system: boolean = true): T | false | undefined => {
  const rePath = system ? `${os.homedir()}/${path}` : path
  try {
    if (!fs.pathExistsSync(rePath)) {
      return false
    }
    const data = fs.readJsonSync(rePath);
    return data
  } catch (err) {
    loggerError(`Error reading file from disk: ${rePath}`);
  }
}

export const ConfigExist = <T = {}>(path: string): T | boolean => {
  const rePath = getCwdPath(path);
  loggerInfo(rePath)
  return !!fs.pathExistsSync(rePath)
}

export const existsFile = (path: string, system: boolean = true) => {
  const rePath = system ? `${os.homedir()}/${path}` : path
  loggerInfo(rePath)
  return fs.pathExistsSync(rePath)
}

/**
 * @description: 写入文件
 * @param {string} path
 * @param {string} fileName
 * @param {string} file
 * @return {*}
 */
export const writeFile = (path: string, fileName: string, file: object, system: boolean = true) => {
  const rePath = system ? `${os.homedir()}/${path}` : path
  loggerInfo(rePath)
  try {
    fs.outputJsonSync(`${rePath}/${fileName}`, file)
    loggerSuccess('Writing file successful!')
  } catch (err) {
    loggerError(`Error writing file from disk: ${err}`);
  }
}

/**
 * @description: 解析 ts 配置文件
 * @param {string} path
 * @param {string} fileName
 * @param {string} file
 * @return {*}
 */
export const loadTsConfig = (path: string) => {
  // 读取并解析 TypeScript 配置文件
  const configPath = getDirPath("../../tsconfig.json");

  // 读取并解析 TypeScript 配置文件
  // 注册 ts-node
  register({
    project: configPath,
  });

  // 加载并执行你的 TypeScript 配置文件
  const config = require(getCwdPath(path)).default;

  // 处理配置文件的逻辑
  return config
}