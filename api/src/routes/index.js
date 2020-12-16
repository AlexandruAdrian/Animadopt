// System
require("dotenv").config();
// Routes
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");

const API_V = process.env.API_V;

const initRoutes = (app) => {
  console.log("* Initializing routes");
  const api = `/api/${API_V}`;

  app.use(`${api}/users`, userRoutes);
  app.use(`${api}/posts`, postRoutes);

  console.log("* Routes initialized \n");
};

module.exports = initRoutes;
