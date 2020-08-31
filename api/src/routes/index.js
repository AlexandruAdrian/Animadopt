require("dotenv").config();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const conversationRoutes = require("./conversationRoutes");

const API_V = process.env.API_V;

const initRoutes = (app) => {
  console.log("Initializing routes...");
  const api = `/api/${API_V}`;

  app.use(`${api}/users`, userRoutes);
  app.use(`${api}/posts`, postRoutes);
  app.use(`${api}/conversations`, conversationRoutes);

  console.log("Routes initialized");
};

module.exports = initRoutes;
