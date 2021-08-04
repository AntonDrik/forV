const path = require('path');
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common");
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const mainVendorsRegexp = /[\\/]node_modules[\\/](react|react-dom|react-redux|react-hook-form|react-images|socket.io-client)[\\/]/;

module.exports = merge(commonConfig, {
    mode: "production",
    devtool: false,
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: false,
                            configFile: path.resolve(__dirname, '../tsconfig.webpack.json')
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'all',
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                // vendor: {
                //     test: /[\\/]node_modules[\\/]/,
                //     name(module) {
                //         const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                //         return `npm.${packageName.replace('@', '')}`;
                //     }
                // },
                vendor: {
                    test: mainVendorsRegexp,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `npm.${packageName.replace('@', '')}`;
                    }
                },
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        // new BundleAnalyzerPlugin(),
        new webpack.DefinePlugin({
            WEBPACK_API_URL: JSON.stringify('')
        })
    ]
});
