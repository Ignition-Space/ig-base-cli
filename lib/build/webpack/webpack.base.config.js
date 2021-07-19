"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("@/util");
var babel_config_1 = __importDefault(require("./babel.config"));
var path_1 = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
var ProgressPlugin = require('webpack').ProgressPlugin;
var imageInlineSizeLimit = parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT || '10000');
exports.default = (function (_a) {
    var mode = _a.mode, entry = _a.entry, output = _a.output, template = _a.template, _b = _a.cssLoader, cssLoader = _b === void 0 ? {} : _b, _c = _a.plugins, plugins = _c === void 0 ? [] : _c;
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
                    test: /\.(png|svg|jpg|gif|jpeg)$/,
                    loader: 'file-loader',
                    options: {
                        limit: imageInlineSizeLimit,
                        name: 'static/media/[name].[hash:8].[ext]',
                    },
                },
                {
                    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                    loader: require.resolve('url-loader'),
                    options: {
                        limit: imageInlineSizeLimit,
                        name: 'static/media/[name].[hash:8].[ext]',
                    },
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    loader: 'file-loader',
                    exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                    options: {
                        name: 'static/media/[name].[hash:8].[ext]',
                    },
                },
                cssLoader
            ].filter(Boolean),
        },
        plugins: __spreadArray([
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [util_1.getCwdPath('dist')],
            }),
            new ProgressPlugin(),
            new HtmlWebpackPlugin({
                template: template,
                filename: 'index.html',
            })
        ], plugins).filter(Boolean),
    };
});
