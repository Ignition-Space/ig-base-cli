import { Configuration } from 'webpack';
interface IWebpackConfig extends Configuration {
    entry: {
        app: string;
    };
    output: {
        filename: string;
        path: string;
    };
    template: string;
    cssLoader: any;
}
export declare const getProConfig: (config: IWebpackConfig) => Configuration;
export {};
