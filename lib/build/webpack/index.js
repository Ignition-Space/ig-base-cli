"use strict";
/*
 * @Author: Cookie
 * @Date: 2021-07-04 14:02:22
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-19 20:22:08
 * @Description:
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.devServerWebpack = exports.buildWebpack = void 0;
require('module-alias/register');
var webpack_1 = __importDefault(require("webpack"));
var util_1 = require("@/util");
var file_1 = require("@/util/file");
var webpack_pro_config_1 = require("./webpack.pro.config");
var webpack_dev_config_1 = require("./webpack.dev.config");
var css_config_1 = require("./css.config");
var WebpackDevServer = require('webpack-dev-server/lib/Server');
var buildWebpack = function () {
    var rewriteConfig = file_1.loadFile(util_1.getCwdPath('./cli.config.json'));
    var webpackConfig = webpack_pro_config_1.getProConfig(__assign(__assign(__assign({}, rewriteConfig), { cssLoader: css_config_1.getCssLoaders(false) }), css_config_1.getCssPlugin()));
    var compiler = webpack_1.default(webpackConfig);
    util_1.loggerTiming('WEBPACK BUILD');
    try {
        compiler.run(function (err, stats) {
            if (err) {
                util_1.loggerError(err);
            }
            // const hasErrors = stats.hasErrors()
            // console.log('hasErrors==>', hasErrors)
            // console.log(stats.toString({
            //   chunks: false,  // Makes the build much quieter
            //   colors: true    // Shows colors in the console
            // }))
            util_1.loggerTiming('WEBPACK BUILD', false);
        });
    }
    catch (error) {
        util_1.loggerError(error);
    }
};
exports.buildWebpack = buildWebpack;
var devServerWebpack = function () {
    var rewriteConfig = file_1.loadFile(util_1.getCwdPath('./cli.config.json'));
    var webpackConfig = webpack_dev_config_1.getDevConfig(__assign(__assign({}, rewriteConfig), { cssLoader: css_config_1.getCssLoaders(true) }));
    var compiler = webpack_1.default(webpackConfig);
    var devServerOptions = {
        stats: 'errors-only',
        contentBase: 'dist',
        hot: true,
        historyApiFallback: true,
        compress: true,
        open: true
    };
    var server = new WebpackDevServer(compiler, devServerOptions);
    server.listen(8000, '127.0.0.1', function () {
        util_1.loggerInfo('Starting server on http://localhost:8000');
    });
};
exports.devServerWebpack = devServerWebpack;
