/*
 * @Author: Cookie
 * @Date: 2021-07-18 19:14:43
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-18 19:22:34
 * @Description:
 */


const fs = require('fs');

export const loadFile = (path: string) => {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const config = JSON.parse(data);
    return config
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`);
  }
}