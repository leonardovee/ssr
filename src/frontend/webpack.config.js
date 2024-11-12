const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const libraryName = "App";

module.exports = {
    target: "web",
    entry: "./src/index.ts",
    devtool: "source-map",
    stats: "errors-only",
    performance: {
        maxEntrypointSize: 300000,
        maxAssetSize: 300000
    },
    watchOptions: {
        ignored: /node_modules/
    },
    output: {
        library: libraryName,
        libraryExport: libraryName,
        libraryTarget: "this",
        filename: 'js/[name].[fullhash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["source-map-loader"],
                enforce: "pre"
            },
            {
                test: /\.(mp3|png|jp(e*)g|svg)$/,
                loader: "url-loader"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: true
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/assets',
                    to: 'assets'
                }
            ]
        })
    ]
};
