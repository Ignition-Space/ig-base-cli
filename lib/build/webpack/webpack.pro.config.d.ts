import { Configuration } from 'webpack';
interface IWebpackConfig extends Configuration {
    entry?: {
        app: string;
    };
    output?: {
        chunkFilename: string;
        filename: string;
        path: string;
    };
    template?: string;
    cssLoader?: any;
    plugins?: any;
}
export declare const getProConfig: (config: IWebpackConfig) => Configuration;
export {};
