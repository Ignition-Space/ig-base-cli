"use strict";
/*
 * @Author: Cookie
 * @Date: 2021-07-18 19:16:47
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-19 20:35:55
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDevConfig = void 0;
var webpack_base_config_1 = __importDefault(require("./webpack.base.config"));
var util_1 = require("@/util");
var getDevConfig = function (config) {
    var entry = config.entry, template = config.template, output = config.output, cssLoader = config.cssLoader, plugins = config.plugins, rest = __rest(config, ["entry", "template", "output", "cssLoader", "plugins"]);
    return __assign(__assign({}, webpack_base_config_1.default({
        mode: 'development',
        entry: {
            app: util_1.getCwdPath((entry === null || entry === void 0 ? void 0 : entry.app) || './src/index.js')
        },
        output: {
            chunkFilename: (output === null || output === void 0 ? void 0 : output.chunkFilename) || '[name].[chunkhash].js',
            filename: (output === null || output === void 0 ? void 0 : output.filename) || '[name].[chunkhash].js',
            path: util_1.getCwdPath((output === null || output === void 0 ? void 0 : output.path) || './dist'), // 打包好之后的输出路径
        },
        template: util_1.getCwdPath(template || 'public/index.html'),
        cssLoader: cssLoader,
        plugins: plugins
    })), rest);
};
exports.getDevConfig = getDevConfig;
