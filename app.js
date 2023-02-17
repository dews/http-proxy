const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

// Create Express Server
const app = express();

// Configuration
const PORT = 80;
const HOST = "localhost";

/** @type {import('http-proxy-middleware/dist/types').Options} */
const Options = {
  target: "http://localhost:3000",
  changeOrigin: true,
  // logLevel: "debug",
  onProxyReq: (proxyReq, req, res) => {
    // console.log(
    //   "🚀 ~ file: app.js:28 ~ proxyReq, req, res",
    //   proxyReq,
    //   req,
    //   res
    // );
    res.send("xxx");
    /* handle proxyReq */
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log(
      "🚀 ~ file: app.js:34 ~ proxyRes, req, res",
      proxyRes,
      req,
      res
    );
    res.send("yyy");
    /* handle proxyRes */
  },
  on: {
    error: (err, req, res) => {
      console.log("🚀 ~ file: app.js:35 ~ err, req, res", err, req, res);
      /* handle error */
    },
  },
};

// http://localhost/others -> http://localhost:3000/others
app.use("/", createProxyMiddleware(Options));

// listen 80 port
app.listen(PORT);

// =================================
const app2 = express();
const port = 3000;

app2.get("/", (req, res) => {
  res.send("Hello World!");
});

app2.post("/*", function (req, res) {
  console.log("🚀 ~ file: app.js:29 ~ req", req);
  res.send("Got a POST request");
});

app2.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
