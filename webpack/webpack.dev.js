const path = require('path');
const merge = require("webpack-merge");
const {DefinePlugin} = require("webpack");
const commonConfig = require("./webpack.common");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = merge(commonConfig, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        historyApiFallback: true,
        compress: true,
        open: false,
        port: 4200
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                            configFile: path.resolve(__dirname, '../tsconfig.webpack.json')
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new DefinePlugin({
            WEBPACK_API_URL: JSON.stringify('http://localhost:3000')
        })
    ]
});
