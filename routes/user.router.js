const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware, mainMiddleware, userAuthMiddleware, fileMiddleware} = require('../middlewares');
const { userValidator, queryValidator} = require('../validators');
const { User, O_Auth } = require('../dataBase');
const { userRolesEnum, tokenEnum } = require('../configs');

router.route('/')
    .get(
        userMiddleware.validateQuery(queryValidator.queryValidate),
        userController.getUsers)
    .post(
        mainMiddleware.validateBody(userValidator.createUserValidator),
        mainMiddleware.checkOne(User, 'email'),
        userController.createUser
    );
router.route('/:user_id')
    .put(
        mainMiddleware.validateBody(userValidator.userEditValidator),
        userMiddleware.checkUserIdMiddleware,
        userAuthMiddleware.checkToken(O_Auth, tokenEnum.ACCESS),
        mainMiddleware.checkRole([
            userRolesEnum.ADMIN,
            userRolesEnum.MANAGER
        ]),
        userController.updateUserById
    )
    .get(
        userMiddleware.checkUserIdMiddleware,
        userController.getUserById
    )
    .delete(
        userMiddleware.checkUserIdMiddleware,
        userAuthMiddleware.checkToken(O_Auth, tokenEnum.ACCESS),
        mainMiddleware.checkRole([
            userRolesEnum.ADMIN,
            userRolesEnum.USER
        ]),
        userController.deleteUserById
    );
router.put(
    '/file/:user_id',
    fileMiddleware.checkUserAvatar,
    userMiddleware.checkUserIdMiddleware,
    userAuthMiddleware.checkToken(O_Auth, tokenEnum.ACCESS),
    userController.updateFileToUser
);

module.exports = router;
