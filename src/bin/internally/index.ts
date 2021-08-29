/*
 * @Author: Cookie
 * @Description:
 */

import build from './build'
import tpl from './tpl'
import git from './git'
import safety from './safety'
import register from './register'
import utils from './utils'

export default [
  ...build,
  ...safety,
  ...git,
  ...tpl,
  ...register,
  ...utils
]