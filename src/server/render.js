import TaskApp from "../components/TaskApp";
import React from "react";
import { renderToString } from "react-dom/server";
import flushChunks from "webpack-flush-chunks";
import { StaticRouter } from "react-router-dom";
import { flushChunkNames } from "react-universal-component/server";

export default ({ clientStats }) => (req, res) => {
  //we need to do things in a specific order

  const app = renderToString(
    <StaticRouter context={{}}>
      <TaskApp />
    </StaticRouter>
  );

  //we need stats from webpack
  const { js, styles, cssHash } = flushChunks(clientStats, {
    chunkNames: flushChunkNames()
  });

  //now when app is being rendered, we know which routes we are using.
  res.send(`<html lang="en">
      <head>
        <meta charset="UTF-8" />

        ${styles}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <div id="react-root">${app}</div>
        ${js}
        ${cssHash}
      </body>
    </html>
    `);
};
