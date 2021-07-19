

import { getDirPath } from '@/util'
import babelConfig from './babel.config'
import { resolve } from 'path'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const { ProgressPlugin } = require('webpack')
import { Configuration } from 'webpack'

interface IWebpack extends Configuration {
  mode?: "development" | "production" | "none";
  template: string
  cssLoader?: any,
  plugins?: any
}

export default ({
  mode,
  entry,
  output,
  template,
  cssLoader = {},
  plugins = []
}: IWebpack): Configuration => {
  return {
    mode,
    entry,
    target: 'web',
    output,
    resolveLoader: {
      modules: ['node_modules', getDirPath('../../node_modules')]
    },
    resolve: {
      alias: {
        '@': resolve('src')
      },
      extensions: ['.ts', '.tsx', '.js', '.json'],
      modules: ['node_modules', getDirPath('../../node_modules')],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: babelConfig,
          exclude: [
            [getDirPath('node_modules')], // 由于node_modules 都是编译过的文件，这里我们不让 babel 去处理其下面的 js 文件
          ]
        },
        {
          test: /\.(png|svg|jpg|gif|jpeg)$/,
          loader: 'file-loader'
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: 'file-loader'
        },
        cssLoader
      ].filter(Boolean),
    },
    plugins: [
      new ProgressPlugin(),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['dist'],
      }),
      new HtmlWebpackPlugin({
        template,
        filename: 'index.html',
      }),
      ...plugins
    ].filter(Boolean),
  }
}