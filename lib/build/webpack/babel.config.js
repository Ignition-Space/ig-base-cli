"use strict";
/*
 * @Author: Cookie
 * @Date: 2021-07-17 16:36:01
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-18 01:44:20
 * @Description:
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    loader: require.resolve('babel-loader'),
    options: {
        configFile: false,
        babelrc: false,
        presets: [
            require.resolve('@babel/preset-env'),
            [
                require.resolve("@babel/preset-react"),
                {
                    "runtime": "automatic"
                }
            ]
        ],
    },
};
