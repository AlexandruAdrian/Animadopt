// Models
const Counties = require("../models/counties/countiesModel");

class LocationController {
  async getLocations() {
    return await Counties.find({});
  }
}

module.exports = new LocationController();
