/*
 * @Author: Cookie
 * @Date: 2021-07-04 14:02:22
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-19 16:46:01
 * @Description:
 */

require('module-alias/register')
import webpack from 'webpack';
import { getCwdPath, loggerTiming, loggerError } from '@/util'
import { loadFile } from '@/util/file'
import { getProConfig } from './webpack.pro.config'
import { getDevConfig } from './webpack.dev.config'
import { getCssLoaders, getCssPlugin } from './css.config'

const WebpackDevServer = require('webpack-dev-server/lib/Server')

export const buildWebpack = () => {

  const rewriteConfig = loadFile(getCwdPath('./cli.config.json'))

  const webpackConfig = getProConfig({ ...rewriteConfig, cssLoader: getCssLoaders(false), ...getCssPlugin() })

  console.log(webpackConfig.module)

  const compiler = webpack(webpackConfig);

  loggerTiming('WEBPACK BUILD');

  compiler.run((err: any, stats: any) => {
    if (err) {
      if (!err.message) {
        loggerError(err);
      }
    }
    loggerTiming('WEBPACK BUILD', false);
  });

}

export const devServerWebpack = () => {

  const rewriteConfig = loadFile(getCwdPath('./cli.config.json'))
  const webpackConfig = getDevConfig({ ...rewriteConfig, cssLoader: getCssLoaders(true) })

  console.log(webpackConfig.module)

  const compiler = webpack(webpackConfig);

  const devServerOptions = {
    stats: 'errors-only',
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
