// const path = require("path");
// const webpack = require("webpack");
// // const HTMLWebpackPlugin = require("html-webpack-plugin");
// const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");
// // const CompressionPlugin = require("compression-webpack-plugin");
// // const BrotliPlugin = require("brotli-webpack-plugin");
// // const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
// // .BundleAnalyzerPlugin;
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// module.exports = {
//   //   entry: { main: ["babel-runtime/regenerator", "./src/main.js"] },
//   name: "client",
//   // entry: { main: "./src/main.js" },
//   entry: {
//     main: [
//       "react-hot-loader/patch",
//       //   "regenerator-runtime/runtime",
//       "webpack-hot-middleware/client?reload=true",
//       "./src/main.js"
//     ]
//   },

//   mode: "production",
//   output: {
//     filename: "[name]-bundle.js",
//     path: path.resolve(__dirname, "../dist"),
//     publicPath: "/dist/"
//   },
//   devServer: {
//     contentBase: "dist",
//     overlay: true,
//     stats: {
//       colors: true
//     }
//   },
//   optimization: {
//     minimize: true,
//     minimizer: [new TerserPlugin()],
//     splitChunks: {
//       chunks: "all",
//       maxInitialRequests: Infinity,
//       minSize: 0,
//       cacheGroups: {
//         vendor: {
//           name: "vendor",
//           chunks: "initial",
//           test: /[\\/]node_modules[\\/]/,

//           minChunks: 2
//         }
//       }
//     }
//   },

//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         use: [{ loader: "babel-loader" }],
//         exclude: /node_modules/
//       },
//       {
//         test: /\.css$/,
//         use: [{ loader: "style-loader" }, { loader: "css-loader" }]
//       },
//       {
//         test: /\.html$/,
//         use: [
//           {
//             loader: "html-loader"
//           }
//         ]
//       },
//       {
//         test: /\.md$/,
//         use: [{ loader: "html-loader" }, { loader: "markdown-loader" }]
//       },
//       {
//         test: /\.(jpg|jpeg|png|gif)$/,
//         use: [
//           {
//             loader: "file-loader",
//             options: { name: "images/[name].[ext]" }
//           }
//         ]
//       }
//     ]
//   },
//   plugins: [
//     // new BundleAnalyzerPlugin({ generateStatsFile: true }),

//     new OptimizeCssAssetsPlugin(),
//     // new MiniCSSExtractPlugin(),
//     new CleanWebpackPlugin(),
//     // new CompressionPlugin(),
//     // new BrotliPlugin(),

//     new webpack.DefinePlugin({
//       "process.env": {
//         NODE_ENV: JSON.stringify("production")
//       }
//     })
//   ]
// };

const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
module.exports = {
  name: "client",
  // entry: {
  //   main: [
  //     "react-hot-loader/patch",
  //     //   "regenerator-runtime/runtime",
  //     // "webpack-hot-middleware/client?reload=true",
  //     "./src/main.js"
  //   ]
  // },
  entry: { main: "./src/main.js" },

  mode: "production",
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      maxInitialRequests: Infinity,
      minSize: 0,
      chunks: "all",
      cacheGroups: {
        vendor: {
          name: "vendor",
          chunks: "initial",
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2
        }
      }
    }
  },

  // devServer: {
  //   contentBase: "dist",
  //   overlay: true,
  //   hot: true,
  //   stats: {
  //     colors: true
  //   }
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{ loader: "babel-loader" }],
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: ExtractCssChunks.loader
          },

          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
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
            options: { name: "images/[name].[ext]" }
          }
        ]
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin({ generateStatsFile: true }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractCssChunks(),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "production"
      )
    }),
    new OptimizeCssAssetsPlugin(),
    new CompressionPlugin(),
    new BrotliPlugin(),
    new webpack.SourceMapDevToolPlugin()
  ]
};
