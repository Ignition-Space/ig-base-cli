/*
 * @Author: Cookie
 * @Description:
 */
import { loggerInfo } from '@/util';
const packageInfo = require('../../package.json');
import shelljs from 'shelljs';
import latestVersion from 'latest-version';


const parseVersion = (ver: string) => {
  return ver.split('.').toString()
}

export const checkVersion = async () => {
  const latestVer = await latestVersion('@boty-design/fe-cli');

  if (parseVersion(latestVer) > parseVersion(packageInfo.version)) {
  } else {
    loggerInfo('The current version is the latest:')
    shelljs.exec('boty -v', { cwd: process.cwd() });
  }
}