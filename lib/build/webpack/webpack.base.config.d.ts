import { Configuration } from 'webpack';
interface IWebpack extends Configuration {
    mode?: "development" | "production" | "none";
    template: string;
    cssLoader?: any;
    plugins?: any;
}
declare const _default: ({ mode, entry, output, template, cssLoader, plugins }: IWebpack) => Configuration;
export default _default;
