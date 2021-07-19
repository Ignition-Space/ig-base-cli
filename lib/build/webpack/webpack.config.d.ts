interface IWebpack {
    mode?: "development" | "production" | "none";
    entry: any;
    output: any;
    template: string;
}
declare const _default: ({ mode, entry, output, template }: IWebpack) => {
    mode: "development" | "production" | "none" | undefined;
    entry: any;
    target: string;
    output: any;
    resolveLoader: {
        modules: string[];
    };
    resolve: {
        alias: {
            '@': string;
        };
        extensions: string[];
        modules: string[];
    };
    module: {
        rules: ({
            test: RegExp;
            use: {
                loader: string;
                options: {
                    configFile: boolean;
                    babelrc: boolean;
                    presets: (string | (string | {
                        runtime: string;
                    })[])[];
                };
            };
            exclude: string[][];
            loader?: undefined;
        } | {
            test: RegExp;
            use: (string | {
                loader: string;
                options: {
                    importLoaders: number;
                    postcssOptions?: undefined;
                };
            } | {
                loader: string;
                options: {
                    postcssOptions: {
                        plugins: (string | {
                            ident: string;
                        })[][];
                    };
                    importLoaders?: undefined;
                };
            })[];
            exclude?: undefined;
            loader?: undefined;
        } | {
            test: RegExp;
            loader: string;
            use?: undefined;
            exclude?: undefined;
        })[];
    };
    plugins: any[];
};
export default _default;
