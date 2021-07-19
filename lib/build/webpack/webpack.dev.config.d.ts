import { Configuration } from 'webpack';
interface IDevWebpackConfig extends Configuration {
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
export declare const getDevConfig: (config: IDevWebpackConfig) => Configuration;
export {};
