const express = require("express");
const https = require("https");
const fs = require("fs");
const mongoose = require("mongoose");
const initMiddlewares = require("./middlewares/index");
const initRoutes = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();

const DB_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;
const app = express();

(async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`Connected to ${DB_URL} database`);

    initMiddlewares(app);
    initRoutes(app);
    app.use(errorHandler);

    const httpsOptions = {
      key: fs.readFileSync("./https/server.key"),
      cert: fs.readFileSync("./https/server.cert"),
    };

    https.createServer(httpsOptions, app).listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
