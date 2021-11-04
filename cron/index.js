const cron = require('node-cron');

const deleteInactive = require('./delete-inactive.job');
const oldTokensRemove = require('./old-token-remove.job');
const sendInactionEmail = require('./send-Inaction-Email.job');

module.exports = () => {
    cron.schedule('1 0 * * *', async () => {
        await oldTokensRemove();
    });

    cron.schedule('* 7 * * *', async () => {
        await deleteInactive();
    });

    cron.schedule('* 8 * * *', async () => {
        await sendInactionEmail();
    });
};
