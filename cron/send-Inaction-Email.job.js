const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayJs.extend(utc);

const { O_Auth } = require('../dataBase');
const { emailService } = require('../service');
const { emailActionEnum } = require('../configs');

module.exports = async () => {
    const previousDays = dayJs.utc().subtract(10, 'day');

    const users = await O_Auth
        .find({ updatedAt: { $lt: previousDays }})
        .populate('user_id');

    const emails = [...new Set( users.map( user => user.user_id.email ))];

    await Promise.allSettled(
        emails.map(email => emailService.sendMail(email, emailActionEnum.INACTIVE))
    );
};
