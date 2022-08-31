/*
 * @Author: Cookie
 * @Date: 2021-07-19 11:51:07
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-19 20:43:20
 * @Description:
 */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

export const getAnalysisPlugin = () => {
  return [
    new BundleAnalyzerPlugin()
  ]
}
