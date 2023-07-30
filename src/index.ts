/*
 * @Author: Cookie
 * @Date: 2021-07-03 20:52:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-07-30 14:36:58
 * @Description:
 */

import { checkVersion as selfCheckVersion } from './util/npm'

// eslint 校验

export const checkVersion = async () => {
  await selfCheckVersion()
}
