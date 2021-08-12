/*
 * @Author: Cookie
 * @Date: 2021-08-03 23:41:18
 * @LastEditors: Cookie
 * @LastEditTime: 2021-08-12 23:31:33
 * @Description:
 */

import inquirer from 'inquirer';
import { gitLabInit } from '@/gitlab'
import { loggerWarring } from '@/util'

const promptList = [
  {
    type: 'list',
    message: '请选择仓库类型:',
    name: 'gitType',
    choices: [
      "gitlab",
      "github",
    ]
  },
  {
    type: 'input',
    message: '请输入 Git 地址:',
    name: 'gitUrl',
    default: 'http://gitlab.cookieboty.com'
  },
  {
    type: 'input',
    message: '请输入用户名:',
    name: 'username',
    default: "CookieBoty"
  },
  {
    type: 'password',
    message: '密码:',
    name: 'password',
  }
];

export const initGit = () => {
  inquirer.prompt(promptList).then((answers: any) => {
    const { gitType, gitUrl, username, password } = answers
    switch (gitType) {
      case 'gitlab': {
        gitLabInit(gitUrl, username, password)
        break
      }
      case 'github': {
        loggerWarring('Waiting')
        break
      }
      default: {
        gitLabInit(gitUrl, username, password)
      }
    }
  })
}