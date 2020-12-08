const CronJob = require('cron').CronJob;
const confirmationCode = require('../models/confirmationCodeModel');

function confirmationCodeService() {
    console.log("Running confirmation code removal service");
    const job = new CronJob('0 0 0 * * *', async () => {
        await confirmationCode.deleteMany({ isValid: false });
    }, null, true, 'Europe/Bucharest');
    job.start();
}

module.exports = confirmationCodeService;
