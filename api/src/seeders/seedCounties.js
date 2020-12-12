const Counties = require("../models/counties/countiesModel");
const { counties: countiesData } = require("./data");

function seedCounties() {
    console.log('Seeding Counties');
    Counties.countDocuments({}, (err, count) => {
       try {
           if (count <= 0) {
               Counties.insertMany(countiesData);
           }
       } catch (err) {
           console.log('Failed to seed counties: ', err);
       }
    });
}

module.exports = seedCounties;
