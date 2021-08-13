/*
 * @Author: Cookie
 * @LastEditors: Cookie
 * @LastEditTime: 2021-08-13 12:13:07
 * @Description: request 模块
 */
import { loggerError } from '@/util';
import request from 'request'
const qs = require("qs");

interface IMethodV {
  GIT_URL?: string
  url: string
  method?: string
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
const gitPost = async <T>({ GIT_URL, url, params = {}, query = {} }: IMethodV) => {
  const sendUrl = `${GIT_URL}${url}?${qs.stringify(query)}`;
  try {
    return new Promise<T>((resolve, reject) => {
      request({
        url: sendUrl,
        method: "POST",
        json: true,
        headers: {
          "content-type": "application/json",
        },
        body: params
      }, (error, response, body) => {
        console.log(response.statusCode, body)
        if (!error && response.statusCode == 200) {
          resolve(body)
        } else {
          reject(body)
        }
      });
    })
  } catch (error) {
    loggerError(error)
    throw (error);
  }
}

/**
 * @author: Cookie
 * @description: 带 version 的通用 api 请求
 */
const methodV = async ({ GIT_URL, url, method, params = {}, query = {} }: IMethodV): Promise<IRequest> => {
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
        body: params
      }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          const { data, code } = body
          resolve({ data, code })
        }
      });
    })
  } catch (error) {
    loggerError(error)
    throw (error);
  }
}


export {
  gitPost,
  methodV
}