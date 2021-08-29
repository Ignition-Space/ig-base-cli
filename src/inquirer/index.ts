/*
 * @Author: Cookie
 * @Date: 2021-08-12 22:18:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-29 18:50:53
 * @Description:
 */

import * as git from '@/inquirer/git';
import * as tpl from '@/inquirer/tpl';
import * as registerPlugin from '@/inquirer/registerPlugin';

export default {
  ...tpl,
  ...git,
  ...registerPlugin
}