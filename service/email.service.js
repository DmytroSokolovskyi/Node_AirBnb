const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const {config} = require('../configs/');
const allTemplates = require('../email-templates');
const {ErrorHandler} = require('../errors');
const {errorsEnum} = require('../configs');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.EMAIL_LOGIN,
        pass: config.EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, emailAction, contex = {}) => {
    const templateInfo = allTemplates[emailAction];

    if (!templateInfo) {
        throw new ErrorHandler(errorsEnum.TEMPLATE_UNDEFINED);
    }

    const html = await templateParser.render(templateInfo.templateName, contex);
    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject: templateInfo.subject,
        html
    });
};

module.exports = {
    sendMail
};
