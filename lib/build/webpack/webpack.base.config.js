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
                    loader: 'file-loader'
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    loader: 'file-loader'
                },
                cssLoader
            ].filter(Boolean),
        },
        plugins: __spreadArray([
            new ProgressPlugin(),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ['dist'],
            }),
            new HtmlWebpackPlugin({
                template: template,
                filename: 'index.html',
            })
        ], plugins).filter(Boolean),
    };
});
