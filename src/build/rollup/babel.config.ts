/*
 * @Author: Cookie
 * @Date: 2021-07-17 20:45:25
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-17 22:02:08
 * @Description:
 */

export default {
  configFile: false, // 禁止读取 babel 配置文件
  babelrc: false, // 禁止读取 babel 配置文件
  presets: [
    require.resolve('@babel/preset-env'),
    require.resolve("@babel/preset-react")
  ],
}