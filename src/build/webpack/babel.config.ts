/*
 * @Author: Cookie
 * @Date: 2021-07-17 16:36:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-05 14:03:38
 * @Description:
 */

export default {
  loader: 'babel-loader?cacheDirectory=true',
  options: {
    configFile: false, // 禁止读取 babel 配置文件
    babelrc: false, // 禁止读取 babel 配置文件
    presets: [
      require.resolve('@babel/preset-env'),
      [
        require.resolve("@babel/preset-react"),
        {
          "runtime": "automatic"
        }
      ],
      [
        require.resolve("@babel/preset-typescript"),
        {
          "isTSX": true,
          "allExtensions": true
        }
      ],
    ],
  },
}