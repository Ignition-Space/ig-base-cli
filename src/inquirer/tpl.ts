/*
 * @Author: Cookie
 * @Date: 2021-08-03 23:41:18
 * @LastEditors: Cookie
 * @LastEditTime: 2021-08-13 12:33:58
 * @Description:
 */

import inquirer from 'inquirer';

import { updateTpl, getTplList, loadTpl } from '@/tpl'

import type { ITpl } from '@/tpl'
import { getGithubBranch } from '@/github';

export const addTpl = () => {
  const promptList = [
    {
      type: 'input',
      message: '请输入仓库地址:',
      name: 'tplUrl',
      default: 'https://github.com/boty-design/react-tpl'
    },
    {
      type: 'input',
      message: '模板标题(默认为 Git 名作为标题):',
      name: 'name',
      default({ tplUrl }: { tplUrl: string }) {
        return tplUrl.substring(tplUrl.lastIndexOf('/') + 1)
      }
    },
    {
      type: 'input',
      message: '描述:',
      name: 'desc',
    }
  ];

  inquirer.prompt(promptList).then((answers: any) => {
    const { tplUrl, name, desc } = answers
    updateTpl({ tplUrl, name, desc })
  })
}

export const selectTpl = () => {
  const tplList = getTplList() as ITpl[]
  const promptList = [
    {
      type: 'list',
      message: '请选择模板下载:',
      name: 'name',
      choices: tplList.map((tpl: ITpl) => tpl.name)
    },
    {
      type: 'input',
      message: '下载路径:',
      name: 'path',
      default({ name }: { name: string }) {
        return name.substring(name.lastIndexOf('/') + 1)
      }
    }
  ];

  inquirer.prompt(promptList).then((answers: any) => {
    const { name, path } = answers
    const select = tplList.filter((tpl: ITpl) => tpl.name)
    const { downloadUrl, org } = select[0]

    // 重新组装下载链接
    const loadUrl = `${downloadUrl}/${org}/zip/refs/heads/main`
    getGithubBranch(select[0])
    loadTpl(name, loadUrl, path)
  })
}
