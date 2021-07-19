/*
 * @Author: Cookie
 * @Date: 2021-07-19 11:51:07
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-19 16:34:35
 * @Description:
 */


const MiniCssExtractPlugin = require("mini-css-extract-plugin");

export const getCssLoaders = (dev: boolean = true) => {
  return {
    test: /\.(css|less)$/,
    use: [
      !dev && MiniCssExtractPlugin.loader,
      dev && 'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              [
                'postcss-preset-env',
                {
                  ident: "postcss"
                },
              ],
            ],
          },
        }
      },
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    ].filter(Boolean),
  }
}

export const getCssPlugin = () => {
  return {
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css',
        ignoreOrder: true,
      })
    ]
  }
}