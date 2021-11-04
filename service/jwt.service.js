const jwt = require('jsonwebtoken');

const {errorsEnum, config, tokenEnum} = require('../configs');
const {ErrorHandler} = require('../errors');
const {actionTokenTypeEnum} = require('../configs/');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, config.JWT_ACCESS_SECRET, { expiresIn: '1h' });
        const refresh_token = jwt.sign({},config.JWT_REFRESH_SECRET, { expiresIn: '30d' });

        return { access_token, refresh_token };
    },

    generateActionToken: (payload, actionTokenType) => {
        let secret = '';

        switch (actionTokenType) {
            case actionTokenTypeEnum.FORGOT_PASSWORD:
                secret = config.JWT_ACTION_FORGOT_SECRET;
                break;
            case actionTokenTypeEnum.ACTIVATE_ACCOUNT:
                secret = config.JWT_ACTION_ACTIVATE_SECRET;
                break;
        }

        return jwt.sign({ payload }, secret,{ expiresIn: '24h' });
    },

    verifyToken: async (token, tokenType) => {
        try {
            let secret = '';

            switch (tokenType) {
                case tokenEnum.ACCESS:
                    secret = config.JWT_ACCESS_SECRET;
                    break;
                case tokenEnum.REFRESH:
                    secret = config.JWT_REFRESH_SECRET;
                    break;
                case actionTokenTypeEnum.FORGOT_PASSWORD:
                    secret = config.JWT_ACTION_FORGOT_SECRET;
                    break;
                case actionTokenTypeEnum.ACTIVATE_ACCOUNT:
                    secret = config.JWT_ACTION_ACTIVATE_SECRET;
                    break;
            }

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(errorsEnum.UNAUTHORIZED);
        }
    }
};
