/*
 * @Author: Cookie
 * @LastEditors: Cookie
 * @LastEditTime: 2021-08-13 14:12:30
 * @Description: request 模块
 */
import { loggerError } from '@/util';
import request from 'request'
const qs = require("qs");

interface IMethodV {
  url: string
  params?: object
  query?: object
}

const GET = async <T>({ url, query = {} }: IMethodV) => {
  const sendUrl = `${url}?${qs.stringify(query)}`;
  try {
    return new Promise<T>((resolve, reject) => {
      request({
        url: sendUrl,
        method: "GET",
        json: true,
        headers: {
          "content-type": "application/json",
          "Accept": "application/vnd.github.v3+json",
          "User-Agent": "Fe-Cli-App",
          "Date": new Date(),
          "X-RateLimit-Limit": 60,
          "X-RateLimit-Remaining": 60,
          "X-RateLimit-Reset": new Date().getTime()
        },
      }, (error, response, body) => {
        console.log(error)
        console.log(response, body)
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

export {
  GET,
}