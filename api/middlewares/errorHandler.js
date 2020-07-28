const { ConflictError } = require("../errors/index");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof ConflictError) {
    return res.status(409).json({
      error: err.message,
    });
  }

  return res.status(err.status || 500).json({
    error: err.message || "Internal server error!",
  });
};

module.exports = errorHandler;
