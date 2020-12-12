const CronJob = require('cron').CronJob;
const User = require('../models/user/userModel');

function removeInactiveUsersService() {
  const job = new CronJob('0 0 0 * * 6', async () => {
    await User.deleteMany({ active: false });
  }, null, true, 'Europe/Bucharest');
  job.start();
}

module.exports = removeInactiveUsersService;