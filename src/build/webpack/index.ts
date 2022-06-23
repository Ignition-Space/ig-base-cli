/*
 * @Author: Cookie
 * @Date: 2021-07-04 14:02:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-23 20:49:27
 * @Description:
 */

import webpack from 'webpack';
import { getCwdPath, loggerTiming, loggerError, loggerInfo, loggerSuccess } from '@/util'
import { loadFile } from '@/util/file'
import { getProConfig } from './webpack.pro.config'
import { getDevConfig } from './webpack.dev.config'
import { getCssLoaders, getCssPlugin } from './css.config'
import cacheConfig from './cache.config';
const openBrowser = require('react-dev-utils/openBrowser')

// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasurePlugin();

// const WebpackDevServer = require('webpack-dev-server/lib/Server')
const WebpackDevServer = require('webpack-dev-server')

/**
 * @description: 
 * @param {*} webpack 构建
 * @return {*}
 */
export const buildWebpack = () => {

  loggerTiming('WEBPACK BUILD');

  const rewriteConfig = loadFile<any>(getCwdPath('./cli.config.json'), false)

  const webpackConfig = getProConfig({
    ...rewriteConfig,
    cssLoader: getCssLoaders(false),
    ...getCssPlugin(),
    ...cacheConfig
  })

  // const compiler = webpack(smp.wrap(webpackConfig));
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

/**
 * @description: 
 * @param {*} webpack 开发环境
 * @return {*}
 */
export const devServerWebpack = () => {

  loggerTiming('WEBPACK DEV');

  let isFirstCompile = true


  const rewriteConfig = loadFile<any>(getCwdPath('./cli.config.json'), false)
  const webpackConfig = getDevConfig({
    cssLoader: getCssLoaders(true),
    ...rewriteConfig,
    ...cacheConfig
  })

  const HOST = webpackConfig?.devServer?.host || 'localhost'
  const PORT = webpackConfig?.devServer?.port || 8000
  const protocol = webpackConfig?.devServer?.https ? 'https' : 'http'
  const url = `${protocol}://${HOST}:${PORT}`

  const compiler = webpack(webpackConfig);

  const devServerOptions = {
    client: {
      progress: true,
      overlay: {
        errors: true,
        warnings: false,
      },
      logging: 'info',
    },
    historyApiFallback: true,
    hot: true,
    compress: true,
    port: PORT,
    open: false,
  };

  const server = new WebpackDevServer(devServerOptions, compiler);

  compiler.hooks.done.tap('done', stats => {
    if (isFirstCompile) {
      isFirstCompile = false
      console.log('oppo the Browser to:：', url)
      openBrowser(url)
    }
  })

  server.start(() => {
    loggerTiming('WEBPACK DEV', false);
    loggerInfo(`Starting server on ${url}`);
  });
}
