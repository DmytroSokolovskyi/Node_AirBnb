module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',

    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/Node',
    PORT: process.env.PORT || 5000,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'node.js',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'node_refresh',
    JWT_ACTION_FORGOT_SECRET: process.env.JWT_FORGOT_SECRET || 'node_js_action_forgot',
    JWT_ACTION_ACTIVATE_SECRET: process.env.JWT_ACTION_ACTIVATE_SECRET || 'node_js_action_activate',

    EMAIL_LOGIN: process.env.EMAIL_LOGIN,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,

    ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@gmail.com',
    ADMIN_PASS: process.env.ADMIN_PASS || 'Q323zzzRz3%$#5vxcv',

    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
    ACTIVATE_URL: process.env.ACTIVATE_URL || 'http://localhost:5000/auth/activate',

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',

    AWS_S3_REGION: process.env.AWS_S3_REGION,
    AWS_S3_NAME: process.env.AWS_S3_NAME,
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,
};
