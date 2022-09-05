/*
 * @Author: Cookie
 * @Date: 2021-07-18 19:16:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-04 17:45:40
 * @Description:
 */

import getBaseConfig from './webpack.base.config'
import { getCwdPath, } from '@/util'

import { Configuration as webpackConfiguration } from 'webpack'
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

interface Configuration extends webpackConfiguration {
  devServer?: WebpackDevServerConfiguration
}

interface IDevWebpackConfig extends Configuration {
  entry?: {
    app?: string
  }
  output?: {
    chunkFilename: string
    filename: string,
    path: string
  }
  template?: string,
  injectionEnvironment?: { [key: string]: string }
  publicPath?: string
  cssLoader?: any
  devServer?: DevServer,
  plugins?: any
}

export const getDevConfig = (config: IDevWebpackConfig): Configuration => {

  const { entry, template, publicPath, output, cssLoader, plugins, ...rest } = config

  return {
    ...getBaseConfig({
      mode: 'development',
      entry: {
        app: getCwdPath(entry?.app || './src/index.tsx')
      },
      output: {
        chunkFilename: output?.chunkFilename || '[name].[chunkhash].js',
        filename: output?.filename || '[name].[chunkhash].js',
        path: getCwdPath(output?.path || './dist'), // 打包好之后的输出路径
      },
      template: getCwdPath(template || 'public/index.html'),
      publicPath,
      cssLoader,
      plugins
    }),
    devServer: {
      host: 'localhost',
      port: '8000',
      https: false
    },
    ...rest
  }
}
