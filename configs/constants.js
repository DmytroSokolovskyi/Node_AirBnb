module.exports = {
    PASSWORD_REGEXP: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@\\\$%\\^&\\*])(?=.{8,128})/),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    MOBILE_REGEXP: new RegExp('^0\\d{9}$'),
    AUTHORIZATION: 'Authorization',

    PHOTO_MAX_SIZE: 2 * 1024 * 1024, // 2MB
    FILE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
    VIDEO_MAX_SIZE: 15 * 1024 * 1024, // 15MB
    PHOTOS_MIMETYPES: [
        'image/gif',
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/tiff',
        'image/webp'
    ],

    DOCS_MIMETYPES: [
        'application/msword', // DOC
        'application/pdf', // PDF
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLS
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOC 2007
    ],

    VIDEOS_MIMETYPES: [
        'video/mpeg',
        'video/mp4',
    ]
};
