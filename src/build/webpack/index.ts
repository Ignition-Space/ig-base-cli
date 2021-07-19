/*
 * @Author: Cookie
 * @Date: 2021-07-04 14:02:22
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-19 21:07:50
 * @Description:
 */

require('module-alias/register')
import webpack from 'webpack';
import { getCwdPath, loggerTiming, loggerError, loggerInfo, loggerSuccess } from '@/util'
import { loadFile } from '@/util/file'
import { getProConfig } from './webpack.pro.config'
import { getDevConfig } from './webpack.dev.config'
import { getCssLoaders, getCssPlugin } from './css.config'

const WebpackDevServer = require('webpack-dev-server/lib/Server')

export const buildWebpack = () => {

  const rewriteConfig = loadFile(getCwdPath('./cli.config.json'))

  const webpackConfig = getProConfig({ ...rewriteConfig, cssLoader: getCssLoaders(false), ...getCssPlugin() })

  const compiler = webpack(webpackConfig);

  loggerTiming('WEBPACK BUILD');

  try {
    compiler.run((err: any, stats: any) => {

      if (err) {
        loggerError(err);
      } else {
        loggerSuccess('WEBPACK SUCCESS!');
      }
      loggerTiming('WEBPACK BUILD', false);
    });
  } catch (error) {
    loggerError(error)
  }

}

export const devServerWebpack = () => {

  const rewriteConfig = loadFile(getCwdPath('./cli.config.json'))
  const webpackConfig = getDevConfig({ ...rewriteConfig, cssLoader: getCssLoaders(true) })

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
    loggerInfo('Starting server on http://localhost:8000');
  });

}
