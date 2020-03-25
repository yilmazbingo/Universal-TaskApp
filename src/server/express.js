import express from "express";
import webpack from "webpack";
import React from "react";
import expressStaticGzip from "express-static-gzip";
import webpackHotServerMiddleware from "webpack-hot-server-middleware";
import path from "path";

import configDevClient from "../../config/webpack.dev-client.js";
import configDevServer from "../../config/webpack.dev-server.js";
import configProdClient from "../../config/webpack.prod-client.js";
import configProdServer from "../../config/webpack.prod-server.js";

const server = express();

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

if (isDev) {
  const compiler = webpack([configDevClient, configDevServer]);
  const clientCompiler = compiler.compilers[0];
  const serverCompiler = compiler.compilers[1];
  const webpackDevMiddleware = require("webpack-dev-middleware")(
    compiler,
    configDevClient.devServer
  );

  const webpackHotMiddleware = require("webpack-hot-middleware")(
    clientCompiler,
    configDevClient.devServer
  );

  server.use(webpackDevMiddleware);
  server.use(webpackHotMiddleware);
  server.use(webpackHotServerMiddleware(compiler));
  console.log(`I am in ${process.env.NODE_ENV} environment`);
} else {
  //when we get here there is no bundle
  webpack([configProdClient, configProdServer]).run((err, stats) => {
    console.log("Stats from webpack", stats.toString({ colors: true }));
    console.log(stats);
    //it wants the stats from the configProdClient
    const clientStats = stats.toJson().children[0];
    const render = require("../../build/prod-server-bundle").default;

    server.use(
      expressStaticGzip("dist", {
        enableBrotli: true,
        orderPreference: ["br", "gzip"],
        index: false
      })
    );
    server.use(render({ clientStats }));

    console.log(`I am in ${process.env.NODE_ENV} environment`);
  });
}

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`server is listening on ${process.env.NODE_ENV} at ${PORT}`);
});
