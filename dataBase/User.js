const { Schema, model } = require('mongoose');

const { userRolesEnum, tableNamesEnum } = require('../configs');
const passwordService = require('../service/password.service');
const { UserNormalize } = require('../util/user.util');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    dateOfBirth: {
        type: Date,
        trim: true,
        required: true
    },
    phone: {
        type: Number,
        unique: true,
        trim: true
    },
    role: {
        type: String,
        default: userRolesEnum.USER,
        enum: Object.values(userRolesEnum)
    },
    activate: {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: String
    },

}, { timestamps: true, toObject: { virtuals: true}, toJSON: { virtuals: true } });

userSchema.methods = {
    comparePassword(password) {
        return passwordService.compare(password, this.password);
    },
    // todo need test
    userNormalize() {
        const fieldsToRemove = ['password'];

        fieldsToRemove.forEach((field) => {
            delete this[field];
        });

        return this;
    },

    normalize() {
        return new UserNormalize(this);
    }
};

userSchema.statics = {
    async createUserWithPassword(user) {
        const hashedPassword = await passwordService.hash(user.password);

        return this.create({ ...user, password: hashedPassword });
    }
};

module.exports = model(tableNamesEnum.USER, userSchema);
