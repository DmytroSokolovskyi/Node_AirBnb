const Joi = require('joi');
const {userRolesEnum} = require('../configs');

const queryValidate = Joi.object({
    perPage: Joi
        .number()
        .min(1)
        .max(60),
    page: Joi
        .number()
        .min(1)
        .max(60),
    sortBy: Joi
        .string()
        .valid('name', 'email', 'role')
        .trim(),
    order: Joi
        .string()
        .valid('desc', 'asc')
        .trim(),
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30),
    ageGte: Joi
        .number()
        .min(1)
        .max(100),
    ageLte: Joi
        .number()
        .min(1)
        .max(100),
    email: Joi
        .string()
        .trim(),
    role: Joi
        .string()
        .allow(...Object.values(userRolesEnum)),
});

module.exports ={
    queryValidate
};
