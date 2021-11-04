const {Schema, model} = require('mongoose');

const {tableNamesEnum} = require('../configs');
const {jwtService} = require('../service');

const oAuthSchema = new Schema({
    access_token: {
        type: String,
        required: true,
        trim: true
    },
    refresh_token: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: tableNamesEnum.USER
    },
}, { timestamps: true, toObject: { virtuals: true}, toJSON: { virtuals: true } });

oAuthSchema.statics = {
    createWithUserId(id) {
        const tokenPair = jwtService.generateTokenPair();
        this.create({ ...tokenPair, user_id: id });

        return tokenPair;
    }
};

oAuthSchema.pre('findOne', function() {
    this.populate('user_id');
});

module.exports = model(tableNamesEnum.O_AUTH, oAuthSchema);
