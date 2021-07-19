/*
 * @Author: Cookie
 * @Date: 2021-07-17 17:51:32
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-17 23:18:49
 * @Description:
 */

import babelConfig from "./babel.config";
import postcss from 'rollup-plugin-postcss'
import { terser } from "rollup-plugin-terser";
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const filesize = require('rollup-plugin-filesize')
const json = require('rollup-plugin-json')
const babel = require('rollup-plugin-babel')
const css = require('rollup-plugin-css-only')
const image = require('@rollup/plugin-image')

import { getCwdPath } from "@/util";

export const inputOptions = {
  input: getCwdPath('./src/index.js'),
  plugins: [
    babel(babelConfig),
    postcss(),
    json(),
    terser(),
    filesize(),
    resolve(),
    commonjs(),
    css({
      output: 'bundle.css',
    }),
    image()
  ],
}

export const outputOptions = {
  format: 'cjs',
  dir: getCwdPath('./cjs'),
}