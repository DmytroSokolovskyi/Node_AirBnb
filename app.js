const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const swaggerUI = require('swagger-ui-express');
require('dotenv').config();

const { config, statusEnum, errorsEnum } = require('./configs');
const { userRouter, userAuthRouter } = require('./routes');
const startCron = require('./cron');
const { ErrorHandler } = require('./errors');
const {defaultData} = require('./util');
const swaggerJson = require('./docs/swagger.json');

const app = express();

mongoose.connect(config.MONGO_CONNECT_URL);

app.use(helmet());
app.use(cors({origin: _configureCors}));
app.use(rateLimit({
    windowMS: 15 * 60 * 1000,
    max: 100
}));

if (config.NODE_ENV === 'dev') {
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

app.use(fileUpload({}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));
app.use('/users', userRouter);
app.use('/auth', userAuthRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || statusEnum.SERVER_ERROR)
        .json({
            msg: err.message
        });
});


const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayJs.extend(utc);

app.listen(config.PORT, () => {
    console.log(`App work ${config.PORT}  now ${dayJs.utc().format('DD/MM/YYYY')}`);
    defaultData();
    startCron();
});

function _configureCors(origin, callback) {

    if (config.NODE_ENV === 'dev') {
        return callback(null, true);
    }

    const whitelist = config.ALLOWED_ORIGIN.split(';');

    if (whitelist.includes(origin)) {
        return callback(new ErrorHandler(errorsEnum.CORS_ERROR), false);
    }

    return callback(null, true);
}
