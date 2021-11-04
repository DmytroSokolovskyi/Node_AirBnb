module.exports = {
    OK: {message: 'You are logged in', status: 200},
    CREATED: {message: 'Created', status: 201},
    NO_CONTENT: {message: 'No Content', status: 204},

    BAD_REQUEST: { message: 'Syntax error in request', status: 400},
    BAD_FORMAT: { message: 'Not supported format', status: 400},
    BIG_FILE: { message: 'File is too big', status: 400},
    UNAUTHORIZED: { message: 'Invalid token', status: 401},
    FORBIDDEN: { message: 'Access restrictions for the client', status: 403},

    NOT_FOUND: {message: 'No user with this data', status: 404},
    TEMPLATE_UNDEFINED: {message: 'Template name undefined', status:404},

    CORS_ERROR: {message: 'CORS is not allowed', status:405},
    CONFLICT: { message: 'User with such data is already present', status: 409},

    SERVER_ERROR: { message: 'Internal server error', status: 500},
};
