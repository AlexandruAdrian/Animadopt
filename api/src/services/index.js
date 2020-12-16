const removeCodeService = require("./removeCodeService");
const removeInactiveUsersService = require("./removeInactiveUsersService");

function initServices() {
  console.log('* Initializing services');
  removeCodeService();
  removeInactiveUsersService();
  console.log('* Services initialized \n');
}

module.exports = initServices;
