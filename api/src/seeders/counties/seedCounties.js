const Counties = require("../../models/counties/countiesModel");
const counties = require("./data");

async function seedCounties() {
  console.log("** Creating Counties");
  await Counties.countDocuments({}, async (err, count) => {
    try {
      if (count <= 0) {
        await Counties.insertMany(counties);
      }
    } catch (err) {
      console.log("Failed to seed counties: ", err);
    }
  });
  console.log("** Created Counties");
}

module.exports = seedCounties;
