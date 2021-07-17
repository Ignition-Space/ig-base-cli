"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var HtmlWebpackPlugin = require('html-webpack-plugin');
var util_1 = require("../../util");
var babel_config_1 = __importDefault(require("./babel.config"));
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
            modules: ['node_modules', util_1.getDirPath('../../node_modules')],
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: babel_config_1.default,
                    exclude: [
                        [util_1.getDirPath('node_modules')], // 由于node_modules 都是编译过的文件，这里我们不让 babel 去处理其下面的 js 文件
                    ]
                },
                {
                    test: /\.css$/,
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
                    test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                    type: 'asset/inline',
                },
                {
                    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'static/media/[name].[hash:8].[ext]',
                    },
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: template,
                filename: 'index.html',
            }),
        ],
    };
});
