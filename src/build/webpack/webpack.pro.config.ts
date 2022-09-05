/*
 * @Author: Cookie
 * @Date: 2021-07-18 19:16:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-04 15:23:31
 * @Description:
 */

import getBaseConfig from './webpack.base.config'
import { getCwdPath, } from '@/util'
import { Configuration } from 'webpack'
const TerserPlugin = require("terser-webpack-plugin");
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
interface IWebpackConfig extends Configuration {
  entry?: {
    app?: string
  }
  output?: {
    chunkFilename: string
    filename: string,
    path: string
  }
  template?: string
  publicPath?: string
  cssLoader?: any
  plugins?: any
}

export const getProConfig = (config: IWebpackConfig): Configuration => {
  const { entry, template, publicPath, output, cssLoader, plugins, ...rest } = config

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
      publicPath,
      cssLoader,
      plugins
    }),
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          test: /\.js(\?.*)?$/i,
          include: getCwdPath('src'),
          exclude: /node_modules/ // 由于node_modules 都是编译过的文件，这里我们不让 babel 去处理其下面的 js 文件
        }),
      ],
      runtimeChunk: {
        name: (entrypoint: any) => `runtime-${entrypoint.name}`,
      },
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 10, // 优先级
            enforce: true
          },
        },
      },
    },
    ...rest,
  }
}
