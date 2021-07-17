"use strict";
/*
 * @Author: Cookie
 * @Date: 2021-07-04 14:02:22
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-18 01:48:06
 * @Description:
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildWebpack = void 0;
var webpack_1 = __importDefault(require("webpack"));
var webpack_config_1 = __importDefault(require("./webpack.config"));
var util_1 = require("../../util");
var ora_1 = __importDefault(require("ora"));
var buildWebpack = function () {
    var spinner = ora_1.default('Webpack building...');
    var config = webpack_config_1.default({
        mode: 'production',
        entry: {
            app: util_1.getCwdPath('./src/index.js')
        },
        output: {
            filename: 'build.js',
            path: util_1.getCwdPath('./dist'), // 打包好之后的输出路径
        },
        template: util_1.getCwdPath('public/index.html')
    });
    var compiler = webpack_1.default(config);
    return new Promise(function (resolve, reject) {
        util_1.loggerTiming('WEBPACK BUILD');
        spinner.start();
        compiler.run(function (err, stats) {
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
