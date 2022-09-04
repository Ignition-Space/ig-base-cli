

import { getCwdPath, getDirPath } from '@/util'
import babelConfig from './babel.config'
import { resolve } from 'path'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

import { Configuration } from 'webpack'

import webpack from 'webpack'

const chalk = require('chalk')

const ProgressBarPlugin = require('progress-bar-webpack-plugin')

interface IWebpack extends Configuration {
  mode?: "development" | "production" | "none";
  template: string
  publicPath?: string
  cssLoader?: any,
  plugins?: any,
  injectionEnvironment?: { [key: string]: string }
}

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);

export default ({
  mode,
  entry,
  output,
  template,
  publicPath = '/',
  cssLoader = {},
  plugins = [],
  injectionEnvironment,
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
      symlinks: false,
      alias: {
        '@': resolve('src')
      },
      extensions: ['.ts', '.tsx', '.js', '.json'],
      modules: ['node_modules', getDirPath('../../node_modules')],
      mainFiles: ['index'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: babelConfig,
          exclude: /node_modules/ // 由于node_modules 都是编译过的文件，这里我们不让 babel 去处理其下面的 js 文件
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'imgs/[hash:10].[ext]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: 'file-loader',
          exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
        cssLoader
      ].filter(Boolean),
    },
    plugins: [
      new ProgressBarPlugin({
        format: `:msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [getCwdPath('dist')],
      }),
      new webpack.DefinePlugin({
        'DEPLOY_ENV': JSON.stringify(process.env.DEPLOY_ENV),
        ...injectionEnvironment,
      }),
      new HtmlWebpackPlugin({
        template,
        publicPath,
        filename: 'index.html',
      }),
      ...plugins
    ].filter(Boolean),
    stats: {
      assets: false,
      moduleAssets: false,
      runtime: false,
      runtimeModules: false,
      modules: false,
      entrypoints: false,
    },
  }
}
