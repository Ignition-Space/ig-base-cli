/*
 * @Author: Cookie
 * @Date: 2021-07-18 19:16:47
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-20 11:31:15
 * @Description:
 */

import getBaseConfig from './webpack.base.config'
import { getCwdPath, } from '@/util'
import { Configuration } from 'webpack'
interface IWebpackConfig extends Configuration {
  entry?: {
    app: string
  }
  output?: {
    chunkFilename: string
    filename: string,
    path: string
  }
  template?: string
  cssLoader?: any
  plugins?: any
}

export const getProConfig = (config: IWebpackConfig): Configuration => {
  const { entry, template, output, cssLoader, plugins, ...rest } = config

  return {
    ...getBaseConfig({
      mode: 'production',
      entry: {
        app: getCwdPath(entry?.app || './src/index.js')
      },
      output: {
        chunkFilename: output?.chunkFilename || 'static/js/[name].[contenthash].js',
        filename: output?.filename || 'static/js/[name].[contenthash].js',
        path: getCwdPath(output?.path || './dist'), // 打包好之后的输出路径
      },
      template: getCwdPath(template || 'public/index.html'),
      cssLoader,
      plugins
    }),
    optimization: {
      runtimeChunk: {
        name: (entrypoint: any) => `runtime-${entrypoint.name}`,
      },
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    ...rest,
  }
}