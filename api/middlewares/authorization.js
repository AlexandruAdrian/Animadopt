const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.SECRET;

const isAuthorized = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({
      error: "Nu sunteti autorizat pentru aceasta actiune",
    });
  }
  const decoded = jwt.decode(token);
  if (!decoded) {
    return res.status(401).json({
      error: "Nu sunteti autorizat pentru aceasta actiune",
    });
  }

  jwt.verify(token, SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({
        error: "Nu sunteti autorizat pentru aceasta actiune",
      });
    }

    Object.defineProperty(req, "user", {
      value: {
        _id: decodedToken._id,
      },
    });
    next();
  });
};

module.exports = isAuthorized;
