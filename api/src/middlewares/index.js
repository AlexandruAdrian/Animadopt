const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

function initMiddelwares(app) {
  console.log("Initializing middleware...");
  app.use(morgan("tiny"));
  app.use(cors());
  app.use(helmet());
  app.use(cookieParser());
  app.use(express.json());
  console.log("Middleware initialized");
}

module.exports = initMiddelwares;
