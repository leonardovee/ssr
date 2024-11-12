const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const libraryName = "App";
const compiledCount = 1;

module.exports = function() {
  var buildOptions = {
    target: "web",
    entry: "./src/index.ts",
    mode: "development",
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
        path: path.resolve(__dirname, 'dist'),  // Output to frontend/dist
        filename: 'js/[name].[hash].js',
        publicPath: '/'
    }
    module: {
      rules: [
        {
          test: /\.ts?$/,
          loader: "ts-loader",
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
        })
    ]
  };
 }

  return buildOptions;
};