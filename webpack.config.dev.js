const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_DEV = "development";
process.env.BABEL_ENV = "development";

module.exports = {
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map",
  entry: "./src/index", // this is the default and unncessary
  output: {
    path: path.resolve(__dirname, "build"), // This is the path to 'build' in memory, no actual build happens in dev
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    // Using webpack to serve the dev server. We can alternatively use Express
    stats: "minimal",
    overlay: true, // overlay errors to the browser
    historyApiFallback: true, // all requests will be sent to index.html. Deep links will be hanlded by React Router,
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    https: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html", //HTML Template
      favicon: "src/favicon.ico"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"] // babel loader is use to transpile modern JS down to version older browsers will understand
      },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
