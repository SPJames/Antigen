const glob = require("glob");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { webpack } = require("webpack");

module.exports = [
  {
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    output: {
      path: path.join(__dirname, "./dist"),
      filename: "[name].[contenthash].js",
      libraryTarget: "umd",
      clean: true,
    },
    entry: {
      utils: glob.sync("./utils/*.ts"),
      components: glob.sync("./components/*.ts"),
    },
    optimization: {
      runtimeChunk: {
        name: "commons",
      },
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    mode: "production",
    devtool: 'source-map',
    plugins: [
      new HtmlWebpackPlugin({
        title: "Antigen",
        template: "index.html",
      }),
      new CopyPlugin({
        patterns: [
          {
            from: "./pages",
            to: "./pages",
          },
        ],
      }),
    ],
  },
];
