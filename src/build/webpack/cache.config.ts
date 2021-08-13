/*
 * @Author: Cookie
 * @Date: 2021-07-20 10:43:08
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-20 11:41:17
 * @Description:
 */

import { getCwdPath } from '@/util'

export default {
  cache: {
    type: 'filesystem',  //  'memory' | 'filesystem'
    cacheDirectory: getCwdPath('./temp_cache'), // 默认将缓存存储在 当前运行路径/.cache/webpack
    // 缓存依赖，当缓存依赖修改时，缓存失效
    buildDependencies: {
      // 将你的配置添加依赖，更改配置时，使得缓存失效
      config: [__filename]
    },
    allowCollectingMemory: true,
    profile: true,
  },
}