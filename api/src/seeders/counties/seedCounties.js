const Counties = require("../../models/counties/countiesModel");
const counties = require("./data");

function seedCounties() {
    console.log('** Creating Counties');
    Counties.countDocuments({}, (err, count) => {
       try {
           if (count <= 0) {
               Counties.insertMany(counties);
           }
       } catch (err) {
           console.log('Failed to seed counties: ', err);
       }
    });
    console.log('** Created Counties');
}

module.exports = seedCounties;
