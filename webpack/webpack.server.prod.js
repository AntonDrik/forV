const path = require('path');
const webpack = require('webpack');
const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin');
const {ProgressPlugin, WatchIgnorePlugin} = require("webpack");
const nodeExternals = require('webpack-node-externals');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

module.exports = {
    mode: "production",
    entry: {
        index: './src/server.ts'
    },
    output: {
        path: path.resolve(__dirname, "../"),
        filename: "server.js"
    },
    devtool: false,
    target: 'node',
    node: {
        __dirname: true,
        __filename: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: false,
                            configFile: path.resolve(__dirname, '../tsconfig.node.json')
                        }
                    }
                ]
            },
            {test: /\.node$/, use: "node-loader"}
        ]
    },
    optimization: {
        minimize: false // Important. Need for correct TypeORM working
    },
    externals: [nodeExternals()],
    resolve: {
        extensions: [".ts", ".js", ".json", ".node"],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: path.resolve(__dirname, '../tsconfig.node.json')
            })
        ]
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
        new ProgressPlugin(),
        new FilterWarningsPlugin({
            exclude: [/mongodb/, /mssql/, /mysql/, /mysql2/, /oracledb/, /pg/, /pg-native/, /pg-query-stream/, /react-native-sqlite-storage/, /redis/, /sqlite3/, /sql.js/, /typeorm-aurora-data-api-driver/]
        })
    ]
};
