/*
 * @Author: Cookie
 * @Description: 工具类
 */

import { checkVersion } from '@/index';

/**
 * @description: 添加模板
 * @param {*}
 * @return {*}
 */
export const checkVersionCommand = {
  description: 'check cli version',
  command: 'check',
  action: () => checkVersion()
}


export default [
  checkVersionCommand,
]