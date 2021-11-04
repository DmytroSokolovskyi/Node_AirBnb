const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayJs.extend(utc);

const { O_Auth, User } = require('../dataBase');
const { emailActionEnum } = require('../configs');
const { emailService } = require('../service');

module.exports = async () => {
    const previousDays = dayJs.utc().subtract(14, 'day');

    const users = await O_Auth
        .find({ updatedAt: { $lt: previousDays }})
        .populate('user_id');

    const toDelete = [...new Set( users.map( user => user.user_id ))];

    const req = toDelete.map(async item => {
        await User.deleteOne({ _id: item._id });
        await O_Auth.find({ user_id: item._id });
        await emailService.sendMail(item.email, emailActionEnum.GOODBYE, { userName: item.name });
    });

    Promise.allSettled(req).then(res => console.log(res));
};
