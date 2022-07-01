import { Configuration } from 'webpack'
import { loadFile } from './file'
import { getCwdPath } from './index'

interface IFeCliConfig extends Omit<Configuration, 'cache'> {
  entry?: {
    app?: string
  }
  output?: {
    chunkFilename: string
    filename: string,
    path: string
  }
  template?: string,
  injectionEnvironment?: {[key: string]: string}
  publicPath?: string
  cssLoader?: any
  plugins?: any
}

const tryLoadConfig = (fileName: string) => {
  try {
    return require(getCwdPath(fileName));
  } catch (e) {
    return null;
  }
}

export const loadConfig = () => {
  let config: IFeCliConfig;
  config = tryLoadConfig('cli.config.json');
  if (!config) {
    config = tryLoadConfig('cli.config.js');
  }
  return config;
}
