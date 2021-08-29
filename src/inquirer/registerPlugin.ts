/*
 * @Author: Cookie
 * @Date: 2021-08-03 23:41:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-29 20:55:19
 * @Description: 注册组件
 */

import inquirer from 'inquirer';

const promptList = [
  {
    type: 'input',
    message: '请输入插件名称:',
    name: 'pluginName',
    default: 'fe-plugin-eslint',
    validate(v: string) {
      return v.includes('fe-plugin-')
    },
    transformer(v: string) {
      return `@boty-design/${v}`
    }
  }
];

export const registerPlugin = () => {
  inquirer.prompt(promptList).then((answers: any) => {
    const { pluginName } = answers
    console.log(pluginName)
  })
}