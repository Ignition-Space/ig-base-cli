"use strict";
/*
 * @Author: Cookie
 * @Date: 2021-07-04 14:02:22
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-18 22:47:43
 * @Description:
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.devWebpack = exports.buildWebpack = void 0;
require('module-alias/register');
var webpack_1 = __importDefault(require("webpack"));
var util_1 = require("@/util");
var file_1 = require("@/util/file");
var webpack_pro_config_1 = require("./webpack.pro.config");
var webpack_dev_config_1 = require("./webpack.dev.config");
var ora_1 = __importDefault(require("ora"));
var WebpackDevServer = require('webpack-dev-server/lib/Server');
var buildWebpack = function () {
    var spinner = ora_1.default('Webpack building...');
    var rewriteConfig = file_1.loadFile(util_1.getCwdPath('./cli.config.json'));
    var compiler = webpack_1.default(webpack_pro_config_1.getProConfig(rewriteConfig));
    return new Promise(function (resolve, reject) {
        util_1.loggerTiming('WEBPACK BUILD');
        spinner.start();
        compiler.run(function (err, stats) {
            console.log(err);
            if (err) {
                if (!err.message) {
                    spinner.fail('WEBPACK BUILD FAILED!');
                    util_1.loggerError(err);
                    return reject(err);
                }
            }
        });
        spinner.succeed('WEBPACK BUILD Successful!');
        util_1.loggerTiming('WEBPACK BUILD', false);
    });
};
exports.buildWebpack = buildWebpack;
var devWebpack = function () {
    var spinner = ora_1.default('Webpack running dev ...');
    var rewriteConfig = file_1.loadFile(util_1.getCwdPath('./cli.config.json'));
    var webpackConfig = webpack_dev_config_1.getDevConfig(rewriteConfig);
    var compiler = webpack_1.default(webpackConfig);
    var devServerOptions = {
        contentBase: 'dist',
        hot: true,
        historyApiFallback: true,
        compress: true,
        open: true
    };
    var server = new WebpackDevServer(compiler, devServerOptions);
    server.listen(8000, '127.0.0.1', function () {
        console.log('Starting server on http://localhost:8000');
    });
};
exports.devWebpack = devWebpack;
