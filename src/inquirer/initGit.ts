/*
 * @Author: Cookie
 * @Date: 2021-08-03 23:41:18
 * @LastEditors: Cookie
 * @LastEditTime: 2021-08-04 00:00:34
 * @Description:
 */

import inquirer from 'inquirer';

const promptList = [
  {
    type: 'input',
    message: '请输入 Git 地址:',
    name: 'git_url',
  },
  {
    type: 'input',
    message: '请输入用户名:',
    name: 'username',
    default: "test_user" // 默认值
  },
  {
    type: 'password',
    message: '密码:',
    name: 'password',
  }
];


export default () => {
  inquirer.prompt(promptList).then((answers: any) => {
    console.log(answers);
  })
}