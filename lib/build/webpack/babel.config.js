"use strict";
/*
 * @Author: Cookie
 * @Date: 2021-07-17 16:36:01
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-20 11:15:34
 * @Description:
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    loader: 'babel-loader?cacheDirectory=true',
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
