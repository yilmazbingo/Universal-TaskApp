require("webpack-hot-middleware/client?reload=true");
require("regenerator-runtime/runtime");
require("@babel/register");
require("normalize.css/normalize.css");
require("./styles/styles.scss");
require("./app");
console.log(process.env.NODE_ENV);
