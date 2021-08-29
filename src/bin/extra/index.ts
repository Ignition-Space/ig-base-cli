/*
 * @Author: Cookie
 * @Description:
 */

import { ICommand } from '../index'
import { getPluginList } from '@/plugin'

const extraPack = getPluginList() as any[]

export const initExtraPack = () => {
  const extraPacks: ICommand[] = []
  extraPack.forEach((extra) => {
    extraPacks.push(module.require(extra.name))
  })
  return extraPacks
}