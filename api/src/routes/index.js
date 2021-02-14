// System
require("dotenv").config();
// Routes
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const categoryRoutes = require("./categoryRoutes");
const adminRoutes = require("./adminRoutes");
const ownerRoutes = require("./ownerRoutes");
const notificationRoutes = require("./notificationRoutes");
const locationRoutes = require("./locationRoutes");

const API_V = process.env.API_V;

const initRoutes = (app) => {
  console.log("* Initializing routes");
  const api = `/api/${API_V}`;

  app.use(`${api}/users`, userRoutes);
  app.use(`${api}/posts`, postRoutes);
  app.use(`${api}/categories`, categoryRoutes);
  app.use(`${api}/admin`, adminRoutes);
  app.use(`${api}/owner`, ownerRoutes);
  app.use(`${api}/notifications`, notificationRoutes);
  app.use(`${api}/locations`, locationRoutes);

  console.log("* Routes initialized \n");
};

module.exports = initRoutes;
