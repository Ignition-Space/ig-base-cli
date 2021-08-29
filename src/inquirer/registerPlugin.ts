/*
 * @Author: Cookie
 * @Date: 2021-08-03 23:41:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-29 23:25:04
 * @Description: 注册组件
 */

import inquirer from 'inquirer';
import { existNpm, npmInstall } from '@/util/npm'
import { loggerSuccess } from '@/util';
import { updatePlugin } from '@/plugin'

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
  inquirer.prompt(promptList).then(async (answers: any) => {
    const { pluginName } = answers
    const exist = await existNpm(`@boty-design/${pluginName}`)
    if (exist) {
      npmInstall(`@boty-design/${pluginName}`)
      loggerSuccess(`@boty-design/${pluginName} register successful!`)
      updatePlugin({ name: `@boty-design/${pluginName}` })
    }
  })
}