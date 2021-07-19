"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var HtmlWebpackPlugin = require('html-webpack-plugin');
var util_1 = require("../../util");
var babel_config_1 = __importDefault(require("./babel.config"));
var path_1 = require("path");
var CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
exports.default = (function (_a) {
    var mode = _a.mode, entry = _a.entry, output = _a.output, template = _a.template;
    return {
        mode: mode,
        entry: entry,
        target: 'web',
        output: output,
        resolveLoader: {
            modules: ['node_modules', util_1.getDirPath('../../node_modules')]
        },
        resolve: {
            alias: {
                '@': path_1.resolve('src')
            },
            extensions: ['.ts', '.tsx', '.js', '.json'],
            modules: ['node_modules', util_1.getDirPath('../../node_modules')],
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    use: babel_config_1.default,
                    exclude: [
                        [util_1.getDirPath('node_modules')], // 由于node_modules 都是编译过的文件，这里我们不让 babel 去处理其下面的 js 文件
                    ]
                },
                {
                    test: /\.(css|less)$/,
                    use: [
                        'style-loader',
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
                        }
                    ],
                },
                {
                    test: /\.(png|svg|jpg|gif|jpeg)$/,
                    loader: 'file-loader'
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    loader: 'file-loader'
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: template,
                filename: 'index.html',
            }),
        ],
    };
});
