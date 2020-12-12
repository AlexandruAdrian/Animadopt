const CronJob = require('cron').CronJob;
const Code = require('../models/code/code');

function removeCodeService() {
    const job = new CronJob('0 0 0 * * *', async () => {
        await Code.deleteMany({ isValid: false });
    }, null, true, 'Europe/Bucharest');
    job.start();
}

module.exports = removeCodeService;
