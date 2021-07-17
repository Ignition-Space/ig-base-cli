/*
 * @Author: Cookie
 * @Date: 2021-07-17 16:36:01
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-17 16:40:18
 * @Description:
 */

export default {
  loader: require.resolve('babel-loader'),
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
      ]
    ],
  },
}
