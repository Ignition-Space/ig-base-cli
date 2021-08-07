/*
 * @Author: Cookie
 * @Date: 2020-07-29 21:23:05
 * @LastEditors: Cookie
 * @LastEditTime: 2021-08-07 23:39:30
 * @Description: gitLab 项目模块 api
 */

import { methodV } from "@/util/http";
// import { loadFile, existsFile } from '@/util/file'
// import { getDirPath } from '@/util'
// const defaultConfig = loadFile(getDirPath('../config/default.config.json')) // 读取本地配置

interface IProjectList {
  pageSize?: number
  pageNum?: number
  access_token: string
  userId?: string
  id?: string
}

/**
 * @description: 获取工程列表
 * @param {IProjectList} param1
 * @return {*}
 */
const getProjectList = async ({ pageSize, pageNum, access_token }: IProjectList) => {
  const { data: projectList } = await methodV({
    url: "/projects",
    method: "GET",
    query: {
      per_page: pageSize,
      page: pageNum,
      access_token
    },
  });
  return { projectList };
};

/**
 * @description: 获取用户所属工程
 * @param {IProjectList} param1
 * @return {*}
 */
const getProjectByUser = async ({ pageSize, pageNum, access_token, userId }: IProjectList) => {
  const { data: projectList } = await methodV({
    url: `/users/${userId}/projects`,
    method: "GET",
    query: {
      per_page: pageSize,
      page: pageNum,
      access_token
    },
  });
  return { projectList };
};

/**
 * @description: 获取工程
 * @param {IProjectList} param1
 * @return {*}
 */
const getProject = async ({ id, access_token }: IProjectList) => {
  const { data: project } = await methodV({
    url: `/projects/${id}`,
    method: "GET",
    query: { access_token }
  });
  return project;
};

/**
 * @description: 创建 gitLab 工程
 * @param {any} param1
 * @return {*}
 */
const createProjects = async ({ gitParams }: any) => {
  const { data } = await methodV({
    url: "/projects",
    method: "POST",
    params: {
      ...gitParams,
    },
  });
  return data;
};

/**
 * @description: 删除 gitLab 工程保护分支
 * @param {number} projectId
 * @return {*}
 */
const deleteProtectedBranches = async (projectId: number) => {
  const url = `/projects/${projectId}/protected_branches/master`;
  const { data } = await methodV({
    url,
    method: "DELETE",
  });
  return data;
};

/**
 * @description: 设置 gitLab 工程保护分支
 * @param {number} projectId
 * @return {*}
 */
const protectedBranches = async (projectId: number) => {
  const url = `/projects/${projectId}/protected_branches`;
  const { data } = await methodV({
    url,
    method: "POST",
    params: {
      name: "master",
      push_access_level: 0,
      merge_access_level: 40,
    },
  });
  return data;
};

export {
  getProjectList,
  getProject,
  getProjectByUser,
  createProjects,
  deleteProtectedBranches,
  protectedBranches,
};
