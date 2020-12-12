const bcrypt = require("bcrypt");

async function hash(string, saltRounds) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(string, salt);

  return hashedPassword;
}

module.exports = hash;