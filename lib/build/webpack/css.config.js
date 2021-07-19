"use strict";
/*
 * @Author: Cookie
 * @Date: 2021-07-19 11:51:07
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-19 20:43:20
 * @Description:
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCssPlugin = exports.getCssLoaders = void 0;
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var getCssLoaders = function (dev) {
    if (dev === void 0) { dev = true; }
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
    };
};
exports.getCssLoaders = getCssLoaders;
var getCssPlugin = function () {
    return {
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'static/css/[name].[contenthash:8].css',
                chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
                ignoreOrder: true,
            })
        ]
    };
};
exports.getCssPlugin = getCssPlugin;
