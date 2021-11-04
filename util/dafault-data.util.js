const {User} = require('../dataBase');
const {config, userRolesEnum} = require('../configs');

module.exports = async () => {
    const user = await User.findOne({role: userRolesEnum.ADMIN});

    if (!user) {
        await User.createUserWithPassword({
            name: 'Admin',
            email: config.ADMIN_EMAIL,
            password: config.ADMIN_PASS,
            role: userRolesEnum.ADMIN,
            activate: true
        });
    }
};
