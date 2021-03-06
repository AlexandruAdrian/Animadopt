const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

function initMiddlewares(app) {
  console.log("* Initializing middlewares");
  app.use(morgan("tiny"));
  app.use(cors());
  app.use(helmet());
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "../public")));
  console.log("* Middleware initialized \n");
}

module.exports = initMiddlewares;
