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
            type?: undefined;
            loader?: undefined;
            options?: undefined;
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
            type?: undefined;
            loader?: undefined;
            options?: undefined;
        } | {
            test: RegExp;
            type: string;
            use?: undefined;
            exclude?: undefined;
            loader?: undefined;
            options?: undefined;
        } | {
            test: RegExp[];
            loader: string;
            options: {
                limit: number;
                name: string;
            };
            use?: undefined;
            exclude?: undefined;
            type?: undefined;
        })[];
    };
    plugins: any[];
};
export default _default;
