const path = require("path");

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const { version } = require('./package.json');

const dist = path.resolve(__dirname, "dist");
const distZip = path.resolve(__dirname, "dist-zip");

const config = {
  mode: process.env.NODE_ENV,
  entry: "./js/index.js",
  output: {
    path: dist,
    filename: "bundle.js"
  },
  devServer: {
    contentBase: dist,
  },
  plugins: [
    new CleanWebpackPlugin([dist, distZip]),

    new HtmlWebpackPlugin({
      template: 'index.html'
    }),

    new CopyWebpackPlugin([
      { from: 'icons', to: 'icons' },
      {
        from: 'manifest.json',
        to: 'manifest.json',
        transform: (content) => {
          const jsonContent = JSON.parse(content);
          jsonContent.version = version;

          // This should only be added in development, but wasm-bindgen uses a
          // `new Function` into the generated code...
          jsonContent['content_security_policy'] = "script-src 'self' 'unsafe-eval'; object-src 'self'";

          return JSON.stringify(jsonContent, null, 2);
        },
      },
    ]),

    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, "crate")
    }),
  ]
};

module.exports = config;
