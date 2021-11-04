const Joi = require('joi').extend(require('@joi/date'));

const {constants, userRolesEnum} = require('../configs');
const dayJs = require("dayjs");
const utc = require('dayjs/plugin/utc');

dayJs.extend(utc);

const createUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    email: Joi
        .string()
        .regex(constants.EMAIL_REGEXP)
        .lowercase()
        .required(),
    password: Joi
        .string()
        .regex(constants.PASSWORD_REGEXP)
        .min(8)
        .max(128)
        .trim()
        .required(),
    dateOfBirth: Joi
        .date()
        .format('YYYY-MM-DD')
        .less(dayJs.utc().subtract(16, 'year'))
        // .utc()
        .required(),
    phone: Joi
        .string()
        .regex(constants.MOBILE_REGEXP)
        .required(),
    role: Joi
        .string()
        .allow(...Object.values(userRolesEnum)),
});

const userEditValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim(),
    role: Joi
        .string()
        .allow(...Object.values(userRolesEnum)),
    avatar: Joi
        .string()
        .trim(),
    dateOfBirth: Joi
        .date()
        .format('YYYY-MM-DD')
        .utc()
        // .timestamp()
        // .max('1/1/2004')
        .required(),
});

module.exports = {
    createUserValidator,
    userEditValidator
};
