const path = require("path");
const webpack = require("webpack");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
module.exports = {
  //   entry: { main: ["babel-runtime/regenerator", "./src/main.js"] },
  name: "server",
  // entry: { server: ["./src/server/render.js"] },
  entry: "./src/server/render.js",

  mode: "development",
  output: {
    filename: "dev-server-bundle.js",
    path: path.resolve(__dirname, "../build"),
    // publicPath: "/"     we do not need public path
    libraryTarget: "commonjs2"
  },
  target: "node",
  externals: [
    nodeExternals({
      whitelist: ["react-universal-component", "webpack-flush-chunks"]
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  devtool: "cheap-eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{ loader: "babel-loader" }],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [{ loader: "css-loader" }, { loader: "sass-loader" }]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.md$/,
        use: [{ loader: "html-loader" }, { loader: "markdown-loader" }]
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: { name: "/images/[name].[ext]" }
          }
        ]
      }
    ]
  },
  plugins: [
    //this is very important for ssr
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new OptimizeCssAssetsPlugin(),
    new CleanWebpackPlugin(),

    new webpack.SourceMapDevToolPlugin(),

    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ]
};
