const bcrypt = require("bcrypt");

async function hash(string, saltRounds) {
  const salt = await bcrypt.genSalt(parseInt(saltRounds));

  return await bcrypt.hash(string, salt);
}

module.exports = hash;
