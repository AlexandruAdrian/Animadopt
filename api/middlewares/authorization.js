const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.SECRET;

const isAuthorized = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(401);
  }
  const decoded = jwt.decode(token);
  if (!decoded) {
    return res.sendStatus(401);
  }

  jwt.verify(token, SECRET, (err, decodedToken) => {
    if (err) {
      return res.sendStatus(401);
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
