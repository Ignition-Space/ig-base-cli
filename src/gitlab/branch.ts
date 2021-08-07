/*
 * @Author: Cookie
 * @Date: 2019-08-29 14:17:50
 * @LastEditors: Cookie
 * @LastEditTime: 2021-08-07 17:31:24
 * @Description: gitLab 分支模块 api
 */

import { methodV } from "@/util/http";

interface IBranchList {
  pageSize?: number
  pageNum?: number
  access_token: string
  userId?: string
  id?: string
  projectId: string
  branch?: string
  ref?: string
}

/**
 * @description: 获取分支列表
 * @param {*}
 * @return {*}
 */
const getBranchList = async ({
  pageSize,
  pageNum,
  projectId,
  access_token,
}: IBranchList) => {
  try {
    const { data, code } = await methodV({
      url: `/projects/${projectId}/repository/branches`,
      method: "GET",
      query: {
        per_page: pageSize,
        page: pageNum,
        access_token,
      },
    });
    switch (code) {
      case 200: {
        return data;
      }
      default: {
        return { msg: data };
      }
    }
  } catch (e) {
    return { msg: e };
  }
};

/**
 * @description: 获取单个分支信息
 * @param {IBranchList} param1
 * @return {*}
 */
const getBranch = async ({ projectId, branch }: IBranchList) => {
  const { code, data } = await methodV({
    url: `/projects/${projectId}/repository/branches/${branch}`,
    method: "GET",
  });
  return data;
};

/**
 * @description: 创建分支
 * @param {IBranchList} param1
 * @return {*}
 */
const createBranch = async ({ ref, projectId, branch, access_token }: IBranchList) => {
  const { code, data } = await methodV({
    url: `/projects/${projectId}/repository/branches`,
    params: {
      ref,
      branch,
    },
    query: { access_token },
    method: "POST",
  });
  return data;
};


/**
 * @description: 删除分支
 * @param {IBranchList} param1
 * @return {*}
 */
const delBranch = async ({ projectId, branch = '' }: IBranchList) => {
  const { code, data } = await methodV({
    url: `/projects/${projectId}/repository/branches/${encodeURIComponent(branch)}`,
    method: "DELETE",
  });
  return data;
};

export {
  getBranchList,
  createBranch,
  getBranch,
  delBranch,
};
