/*
 * @Author: Cookie
 * @Date: 2021-08-03 23:41:18
 * @LastEditors: Cookie
 * @LastEditTime: 2021-08-13 16:39:53
 * @Description:
 */

import inquirer from 'inquirer';
import { Subject } from 'rxjs';

import { updateTpl, getTplList, loadTpl } from '@/tpl'

import type { ITpl } from '@/tpl'
import { getGithubBranch } from '@/github';
import type { IBranch } from '@/github';
import { loggerError } from '@/util';

/**
 * @description: 添加模板
 * @param {*}
 * @return {*}
 */
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

/**
 * @description: 选择模板下载
 * @param {*}
 * @return {*}
 */
export const selectTpl = async () => {
  const prompts: any = new Subject();
  let select: ITpl
  let githubName: string
  let path: string
  let loadUrl: string

  try {
    const onEachAnswer = async (result: any) => {
      const { name, answer } = result
      if (name === 'name') {
        githubName = answer
        select = tplList.filter((tpl: ITpl) => tpl.name === answer)[0]
        const { downloadUrl, org } = select
        const branches = await getGithubBranch(select) as IBranch[]
        loadUrl = `${downloadUrl}/${org}/zip/refs/heads`
        if (branches.length === 1) {
          loadUrl = `${loadUrl}/${branches[0].name}`
          prompts.next({
            type: 'input',
            message: '下载路径:',
            name: 'path',
            default: githubName
          });
        } else {
          prompts.next({
            type: 'list',
            message: '请选择分支:',
            name: 'branch',
            choices: branches.map((branch: IBranch) => branch.name)
          });
        }
      }
      if (name === 'branch') {
        loadUrl = `${loadUrl}/${answer}`
        prompts.next({
          type: 'input',
          message: '下载路径:',
          name: 'path',
          default: githubName
        });
      }
      if (name === 'path') {
        path = answer
        prompts.complete();
      }
    }

    const onError = (error: string) => {
      loggerError(error)
    }

    const onCompleted = () => {
      loadTpl(githubName, loadUrl, path)
    }

    inquirer.prompt(prompts).ui.process.subscribe(onEachAnswer, onError, onCompleted);

    const tplList = getTplList() as ITpl[]

    prompts.next({
      type: 'list',
      message: '请选择模板:',
      name: 'name',
      choices: tplList.map((tpl: ITpl) => tpl.name)
    });
  } catch (error) {
    loggerError(error)
  }
}
