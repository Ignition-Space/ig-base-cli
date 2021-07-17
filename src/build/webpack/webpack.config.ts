const HtmlWebpackPlugin = require('html-webpack-plugin')

import { getDirPath } from '../../util'
import babelConfig from './babel.config'

interface IWebpack {
  mode?: "development" | "production" | "none";
  entry: any
  output: any
  template: string
}

export default ({
  mode,
  entry,
  output,
  template
}: IWebpack) => {
  return {
    mode,
    entry,
    target: 'web',
    output,
    resolveLoader: {
      modules: ['node_modules', getDirPath('../../node_modules')]
    },
    resolve: {
      modules: ['node_modules', getDirPath('../../node_modules')],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/, //使用loader的目标文件。这里是.js
          use: babelConfig,
          exclude: [
            [getDirPath('node_modules')], // 由于node_modules 都是编译过的文件，这里我们不让 babel 去处理其下面的 js 文件
          ]
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'postcss-preset-env',
                      {
                        ident: "postcss"
                      },
                    ],
                  ],
                },
              }
            }
          ],
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline',
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template,
        filename: 'index.html',
      }),
    ],
  }
}