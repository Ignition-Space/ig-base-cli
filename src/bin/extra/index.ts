/*
 * @Author: Cookie
 * @Description:
 */

import { ICommand } from '../index'

const extraPack = [
  {
    name: '@boty-design/fe-plugin-eslint'
  }
]

export const initExtraPack = () => {
  const extraPacks: ICommand[] = []
  extraPack.forEach((extra) => {
    extraPacks.push(module.require(extra.name))
  })
  return extraPacks
}