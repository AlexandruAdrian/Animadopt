const userRoutes = require("./userRoutes");

const initRoutes = (app) => {
  console.log("Initializing routes...");

  app.use(userRoutes);

  console.log("Routes initialized");
};

module.exports = initRoutes;
