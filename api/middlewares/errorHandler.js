const { ConflictError, NotFoundError, InvalidError } = require("../errors/index");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof ConflictError) {
    return res.status(409).json({
      error: err.message,
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({
      error: err.message,
    });
  }

  if (err instanceof InvalidError) {
    return res.status(400).json({
      error: err.message
    })
  }

  return res.status(err.status || 500).json({
    error: err.message || "Internal server error!",
  });
};

module.exports = errorHandler;
