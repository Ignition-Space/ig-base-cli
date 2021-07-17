/*
 * @Author: Cookie
 * @Date: 2021-07-17 17:52:22
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-17 22:07:46
 * @Description:
 */

const rollup = require('rollup');
import { inputOptions, outputOptions } from "./rollup.config";
import { loggerTiming } from '../../util'


export const buildRollup = async () => {

  loggerTiming('ROLLUP BUILD');
  const bundle = await rollup.rollup(inputOptions);

  await bundle.write(outputOptions);

  loggerTiming('ROLLUP BUILD', false);

}

