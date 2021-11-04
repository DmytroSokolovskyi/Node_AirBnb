const { jwtService, emailService, passwordService } = require('../service');
const { O_Auth, ActionToken, User } = require('../dataBase');
const { statusEnum, tokenEnum, emailActionEnum, actionTokenTypeEnum, config} = require('../configs');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const user = req.user;
            const { password } = req.body;

            const clearUser = user.normalize();
            await user.comparePassword(password);

            const tokenPair = await O_Auth.createWithUserId(user._id);

            res.json({ clearUser, ...tokenPair });
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const { token } = req;

            await O_Auth.deleteOne({ [tokenEnum.ACCESS]: token} );

            res.sendStatus(statusEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    logoutAll: async (req, res, next) => {
        try {
            const { _id } = req.user;

            await O_Auth.deleteMany({ user_id: _id });

            res.sendStatus(statusEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    changeRefresh: async (req, res, next) => {
        try {
            const { token } = req;
            const tokenPair = jwtService.generateTokenPair();
            const newPair = await O_Auth.findOneAndUpdate(
                { [tokenEnum.REFRESH]: token },
                { ...tokenPair },
                { new: true }
            );

            res.json(newPair);
        } catch (e) {
            next(e);
        }
    },

    forgotPass: async (req, res, next) => {
        try {
            const { _id, email, name } = req.one;
            const actionToken = jwtService.generateActionToken(email, actionTokenTypeEnum.FORGOT_PASSWORD);
            await ActionToken.create({
                action_token: actionToken,
                type: actionTokenTypeEnum.FORGOT_PASSWORD,
                user_id: _id
            });

            await emailService.sendMail(
                email,
                emailActionEnum.FORGOT_PASS,
                { userName: name, URL: `${ config.FRONTEND_URL }/forgot/password?token=${ actionToken }` });

            res.sendStatus(statusEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    setNewPass: async (req, res, next) => {
        try {
            const { _id, email, name } = req.user;
            const { password } = req.body;
            const hashedPassword = await passwordService.hash(password);

            await User.findByIdAndUpdate( _id , { password: hashedPassword });
            await O_Auth.deleteMany({ user_id: _id });
            await ActionToken.deleteMany({ user_id: _id });

            await emailService.sendMail(email, emailActionEnum.CHANGE_PASS, { userName: name });

            res.sendStatus(statusEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    changePass: async (req, res, next) => {
        try {
            const {user, user:{_id, email, name } } = req;
            const { oldPassword, newPassword } = req.body;

            await user.comparePassword(oldPassword);

            const hashedPassword = await passwordService.hash(newPassword);
            await User.findByIdAndUpdate( _id , { password: hashedPassword });
            await O_Auth.deleteMany({ user_id: _id });


            await emailService.sendMail(email, emailActionEnum.CHANGE_PASS, { userName: name });

            res.sendStatus(statusEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    activateAccount: async (req, res, next) => {
        try {
            const {user, token} = req;

            await ActionToken.deleteOne({action_token: token});

            await User.findByIdAndUpdate(user._id, {activate: true}, {new: true});

            res.json(statusEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },
};
