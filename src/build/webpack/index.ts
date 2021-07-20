/*
 * @Author: Cookie
 * @Date: 2021-07-04 14:02:22
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-20 11:52:21
 * @Description:
 */

require('module-alias/register')
import webpack from 'webpack';
import { getCwdPath, loggerTiming, loggerError, loggerInfo, loggerSuccess } from '@/util'
import { loadFile } from '@/util/file'
import { getProConfig } from './webpack.pro.config'
import { getDevConfig } from './webpack.dev.config'
import { getCssLoaders, getCssPlugin } from './css.config'
import cacheConfig from './cache.config';

const WebpackDevServer = require('webpack-dev-server/lib/Server')

export const buildWebpack = () => {

  loggerTiming('WEBPACK BUILD');

  const rewriteConfig = loadFile(getCwdPath('./cli.config.json'))

  const webpackConfig = getProConfig({ ...rewriteConfig, cssLoader: getCssLoaders(false), ...getCssPlugin(), ...cacheConfig })

  const compiler = webpack(webpackConfig);

  try {
    compiler.run((err: any, stats: any) => {

      if (err) {
        loggerError(err);
      } else {
        loggerSuccess('WEBPACK SUCCESS!');
      }
      compiler.close(() => {
        loggerInfo('WEBPACK GENERATE CACHE');
      });
      loggerTiming('WEBPACK BUILD', false);
    });
  } catch (error) {
    loggerError(error)
  }

}

export const devServerWebpack = () => {

  loggerTiming('WEBPACK DEV');
  const rewriteConfig = loadFile(getCwdPath('./cli.config.json'))
  const webpackConfig = getDevConfig({ ...rewriteConfig, cssLoader: getCssLoaders(true), ...cacheConfig })

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
    loggerTiming('WEBPACK DEV', false);
    loggerInfo('Starting server on http://localhost:8000');
  });

}
