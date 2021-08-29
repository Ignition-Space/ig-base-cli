/*
 * @Author: Cookie
 * @Description: 工具类
 */

import { checkVersion } from '@/util/checkVersion';


/**
 * @description: 添加模板
 * @param {*}
 * @return {*}
 */
export const checkVersionCommand = {
  version: '0.1.0',
  description: 'check cli version',
  command: 'check',
  action: () => checkVersion()
}


export default [
  checkVersionCommand,
]