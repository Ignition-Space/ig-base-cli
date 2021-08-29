/*
 * @Author: Cookie
 * @Description: 插件注册
 */


import inquirer from '@/inquirer';

const { registerPlugin } = inquirer

/**
 * @description: 添加插件
 * @param {*}
 * @return {*}
 */
export const registerPluginCommand = {
  version: '0.1.0',
  description: 'register plugin',
  command: 'register plugin',
  action: () => registerPlugin()
}

export default [
  registerPluginCommand
]