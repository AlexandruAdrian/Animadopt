const { body } = require("express-validator");

const validatePost = () => {
  return [
    body("title")
      .escape()
      .trim()
      .notEmpty()
      .withMessage("Titlul este obligatoriu"),
    body("description")
      .escape()
      .trim()
      .notEmpty()
      .withMessage("Descrierea este obligatorie"),
  ];
};

module.exports = validatePost;
