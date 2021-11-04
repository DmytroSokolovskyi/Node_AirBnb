const {emailActionEnum} = require('../configs');

module.exports = {
    [emailActionEnum.WELCOME]: {
        templateName: emailActionEnum.WELCOME,
        subject: 'Welcome !!!'
    },
    [emailActionEnum.NEW_CAR]: {
        templateName: emailActionEnum.NEW_CAR,
        subject: 'Сongratulations'
    },
    [emailActionEnum.GOODBYE]: {
        templateName: emailActionEnum.GOODBYE,
        subject: 'Very sorry'
    },
    [emailActionEnum.UPDATE]: {
        templateName: emailActionEnum.UPDATE,
        subject: 'Good news'
    },
    [emailActionEnum.FORGOT_PASS]: {
        templateName: emailActionEnum.FORGOT_PASS,
        subject: 'Be careful'
    },
    [emailActionEnum.CHANGE_PASS]: {
        templateName: emailActionEnum.CHANGE_PASS,
        subject: 'Attention'
    },
    [emailActionEnum.INACTIVE]: {
        templateName: emailActionEnum.INACTIVE,
        subject: 'be careful'
    }
};
