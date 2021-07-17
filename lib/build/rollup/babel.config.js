"use strict";
/*
 * @Author: Cookie
 * @Date: 2021-07-17 20:45:25
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-17 22:02:08
 * @Description:
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    configFile: false,
    babelrc: false,
    presets: [
        require.resolve('@babel/preset-env'),
        require.resolve("@babel/preset-react")
    ],
};
