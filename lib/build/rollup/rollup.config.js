"use strict";
/*
 * @Author: Cookie
 * @Date: 2021-07-17 17:51:32
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-17 23:18:49
 * @Description:
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputOptions = exports.inputOptions = void 0;
var babel_config_1 = __importDefault(require("./babel.config"));
var rollup_plugin_postcss_1 = __importDefault(require("rollup-plugin-postcss"));
var rollup_plugin_terser_1 = require("rollup-plugin-terser");
var rollup_plugin_node_resolve_1 = __importDefault(require("rollup-plugin-node-resolve"));
var rollup_plugin_commonjs_1 = __importDefault(require("rollup-plugin-commonjs"));
var filesize = require('rollup-plugin-filesize');
var json = require('rollup-plugin-json');
var babel = require('rollup-plugin-babel');
var css = require('rollup-plugin-css-only');
var image = require('@rollup/plugin-image');
var util_1 = require("@/util");
exports.inputOptions = {
    input: util_1.getCwdPath('./src/index.js'),
    plugins: [
        babel(babel_config_1.default),
        rollup_plugin_postcss_1.default(),
        json(),
        rollup_plugin_terser_1.terser(),
        filesize(),
        rollup_plugin_node_resolve_1.default(),
        rollup_plugin_commonjs_1.default(),
        css({
            output: 'bundle.css',
        }),
        image()
    ],
};
exports.outputOptions = {
    format: 'cjs',
    dir: util_1.getCwdPath('./cjs'),
};
