/*
 * @Author: Cookie
 * @Date: 2019-08-29 14:17:50
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-25 21:32:06
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
 * @author: Cookie
 * @description: 获取分支列表
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
 * @author: Cookie
 * @description: 获取单分支
 */
const getBranch = async ({ projectId, branch }: IBranchList) => {
  const { code, data } = await methodV({
    url: `/projects/${projectId}/repository/branches/${branch}`,
    method: "GET",
  });
  return data;
};

/**
 * @author: Cookie
 * @description: 创建分支
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

const setProtectedBranch = async ({ projectId }: IBranchList) => {
  const { code, data } = await methodV({
    url: `/projects/${projectId}/protected_branches`,
    params: {
      name: "zeus/*",
      merge_access_level: 30,
      push_access_level: 0,
    },
    method: "POST",
  });
  return data;
};

const delProtectedBranch = async ({ projectId }: IBranchList) => {
  const { code, data } = await methodV({
    url: `/projects/${projectId}/protected_branches/zeus%2F*`,
    method: "DELETE",
  });
  return data;
};

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
  setProtectedBranch,
  delProtectedBranch,
  delBranch,
};
