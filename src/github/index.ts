/*
 * @Author: Cookie
 * @Date: 2021-08-13 12:08:35
 * @LastEditors: Cookie
 * @LastEditTime: 2021-08-13 12:34:09
 * @Description:
 */

import { GET } from "./request"

import type { ITpl } from '@/tpl'

interface IBranch {
  name: string,
  commit: {
    sha: string,
    url: string
  },
  protected: boolean
}

/**
 * @description: 获取 github 项目分支
 * @param {ITpl} params
 * @return {*}
 */
export const getGithubBranch = async (params: ITpl) => {
  const { apiUrl, org } = params
  const url = `${apiUrl}/repos/${org}/branches`
  console.log('url==>', url)
  const res = await GET<IBranch>({ url })
  console.log(res)
  return res
}