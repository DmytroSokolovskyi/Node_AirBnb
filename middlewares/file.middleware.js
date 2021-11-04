const {PHOTOS_MIMETYPES, PHOTO_MAX_SIZE} = require("../configs/constants");
const ErrorHandler = require("../errors/ErrorHandler");
const {errorsEnum} = require('../configs');

module.exports = {
    checkUserAvatar: (req, res, next) => {
        try {
            if (!req.files || !req.files.avatar) {
                next();
                return;
            }

            const { size, mimetype } = req.files.avatar;

            if (!PHOTOS_MIMETYPES.includes(mimetype)) {
                throw new ErrorHandler(errorsEnum.BAD_FORMAT);
            }

            if (size > PHOTO_MAX_SIZE) {
                throw new ErrorHandler(errorsEnum.BIG_FILE);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
