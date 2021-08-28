/*
 * @Author: Cookie
 * @Description:
 */

import build from './build'
import tpl from './tpl'
import git from './git'
import safety from './safety'

export default [
  ...build,
  ...safety,
  ...git,
  ...tpl,
]