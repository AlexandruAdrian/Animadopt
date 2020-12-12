const removeCodeService = require("./removeCodeService");
const removeInactiveUsersService = require("./removeInactiveUsersService");

function initServices() {
  console.log('Initializing cron jobs...');
  removeCodeService();
  removeInactiveUsersService();
  console.log('Cron jobs initialized');
}

module.exports = initServices;