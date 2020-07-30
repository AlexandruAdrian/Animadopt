require("dotenv").config();
const userRoutes = require("./userRoutes");

const API_V = process.env.API_V;

const initRoutes = (app) => {
  console.log("Initializing routes...");

  app.use(`/api/${API_V}/users`, userRoutes);

  console.log("Routes initialized");
};

module.exports = initRoutes;
