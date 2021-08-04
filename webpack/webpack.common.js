const path = require("path");
const webpack = require('webpack');
const {ProgressPlugin, WatchIgnorePlugin} = require("webpack");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin');
const packageJson = require('../package.json');

module.exports = {
    entry: {
        index: './client/index.tsx'
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "bundles/[name].js",
        chunkFilename: 'bundles/[name].bundle.js'
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json"],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: path.resolve(__dirname, '../tsconfig.webpack.json')
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ["file-loader"]
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, '../client/index.html'),
            favicon: path.resolve(__dirname, "../client/assets/favicon.ico"),
            filename: "index.html"
        }),
        new WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
        new CleanWebpackPlugin(),
        new ProgressPlugin(),
        new webpack.DefinePlugin({
            WEBPACK_APP_VERSION: JSON.stringify(packageJson.version)
        })
    ]
};
