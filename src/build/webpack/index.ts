/*
 * @Author: Cookie
 * @Date: 2021-07-04 14:02:22
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-17 21:12:22
 * @Description:
 */

import webpack from 'webpack';
import getConfig from './webpack.config'
import { getCwdPath, loggerTiming } from '../../util'

export const buildWebpack = () => {
  const config = getConfig({
    mode: 'production',
    entry: {
      app: getCwdPath('./src/index.js')
    },
    output: {
      filename: 'build.js',
      path: getCwdPath('./dist'), // 打包好之后的输出路径
    },
    template: getCwdPath('public/index.html')
  })
  const compiler = webpack(config);

  return new Promise((resolve, reject) => {
    loggerTiming('WEBPACK BUILD');

    compiler.run((err: any, stats: any) => {
      if (err) {
        if (!err.message) {
          return reject(err);
        }
      }
    });

    loggerTiming('WEBPACK BUILD', false);
  })
}