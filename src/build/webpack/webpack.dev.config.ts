/*
 * @Author: Cookie
 * @Date: 2021-07-18 19:16:47
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-19 16:38:10
 * @Description:
 */

import getBaseConfig from './webpack.base.config'
import { getCwdPath, } from '@/util'
import { Configuration } from 'webpack'

interface IDevWebpackConfig extends Configuration {
  entry: {
    app: string
  }
  output: {
    filename: string,
    path: string
  }
  template: string,
  cssLoader: any
}

export const getDevConfig = (config: IDevWebpackConfig): Configuration => {

  const { entry: { app }, template, output: { filename, path }, cssLoader, plugins, ...rest } = config

  return {
    ...getBaseConfig({
      mode: 'development',
      entry: {
        app: getCwdPath(app || './src/index.js')
      },
      output: {
        filename: filename || 'build.js',
        path: getCwdPath(path || './dist'), // 打包好之后的输出路径
      },
      template: getCwdPath(template || 'public/index.html'),
      cssLoader,
      plugins
    }),
    ...rest
  }
}