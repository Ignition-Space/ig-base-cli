/*
 * @Author: Cookie
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-25 21:28:29
 * @Description: request 模块
 */

import { loadFile } from '@/util/file'
import { getDirPath } from '@/util'
import request from 'request'

const defaultConfig = loadFile(getDirPath('../config/default.config.json')) // 读取本地配置

const GIT_URL = defaultConfig.GIT_URL

const qs = require("qs");

interface IMethodV {
  url: string
  method: string
  params?: object
  query?: object
}

interface IRequest {
  data: any
  code: number
}

/**
 * @author: Cookie
 * @description: 不带 version 的 api 请求
 */
const gitPost = async ({ url, params = {}, query = {} }: IMethodV): Promise<IRequest> => {
  const sendUrl = `${GIT_URL}${url}?${qs.stringify(query)}`;
  try {
    return new Promise<IRequest>((resolve) => {
      request({
        url: url,
        method: "POST",
        json: true,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(params)
      }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          const { data, code } = body
          resolve({ data, code })
        }
      });
    })
  } catch (error) {
    throw (error);
  }
}

/**
 * @author: Cookie
 * @description: 带 version 的通用 api 请求
 */
const methodV = async ({ url, method, params = {}, query = {} }: IMethodV): Promise<IRequest> => {
  let sendUrl = `${GIT_URL}/api/v4${url}`
  if (query) {
    sendUrl = `${sendUrl}?${qs.stringify(query)}`;
  }
  try {
    return new Promise<IRequest>((resolve) => {
      request({
        url: url,
        method,
        json: true,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(params)
      }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          const { data, code } = body
          resolve({ data, code })
        }
      });
    })
  } catch (error) {
    throw (error);
  }
}


export {
  gitPost,
  methodV
}