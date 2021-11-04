const {isValidObjectId} = require('mongoose');

const User = require('../dataBase/User');
const {errorsEnum, statusEnum} = require('../configs');

module.exports = {
    checkUserIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            if (!isValidObjectId(user_id)) {
                return next(errorsEnum.BAD_REQUEST);
            }

            const user = await User.findById(user_id).lean();

            if (!user) {
                return next(errorsEnum.NOT_FOUND);
            }

            req.userById = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateQuery: (validator) => async (req, res, next) => {
        try {
            const {error, value} = await validator.validate(req.query);

            if (error) {
                return next({message: error.details[0].message, code: statusEnum.BAD_REQUEST});
            }

            req.query = value;

            next();
        } catch (e) {
            next(e);
        }
    },
};
