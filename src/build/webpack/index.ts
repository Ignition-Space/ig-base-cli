/*
 * @Author: Cookie
 * @Date: 2021-07-04 14:02:22
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-18 22:52:45
 * @Description:
 */

require('module-alias/register')
import webpack from 'webpack';
import { getCwdPath, loggerTiming, loggerError } from '@/util'
import { loadFile } from '@/util/file'
import { getProConfig } from './webpack.pro.config'
import { getDevConfig } from './webpack.dev.config'
import ora from "ora";

const WebpackDevServer = require('webpack-dev-server/lib/Server')

export const buildWebpack = () => {

  const spinner = ora('Webpack building...')

  const rewriteConfig = loadFile(getCwdPath('./cli.config.json'))

  const compiler = webpack(getProConfig(rewriteConfig));

  return new Promise((resolve, reject) => {
    loggerTiming('WEBPACK BUILD');
    spinner.start();
    compiler.run((err: any, stats: any) => {
      console.log(err)
      if (err) {
        if (!err.message) {
          spinner.fail('WEBPACK BUILD FAILED!');
          loggerError(err);
          return reject(err);
        }
      }
    });

    spinner.succeed('WEBPACK BUILD Successful!');
    loggerTiming('WEBPACK BUILD', false);
  })
}

export const devWebpack = () => {
  const spinner = ora('Webpack running dev ...')

  const rewriteConfig = loadFile(getCwdPath('./cli.config.json'))
  const webpackConfig = getDevConfig(rewriteConfig)

  const compiler = webpack(webpackConfig);

  const devServerOptions = {
    contentBase: 'dist',
    hot: true,
    historyApiFallback: true,
    compress: true,
    open: true
  };

  const server = new WebpackDevServer(compiler, devServerOptions);

  server.listen(8000, '127.0.0.1', () => {
    console.log('Starting server on http://localhost:8000');
  });

}
