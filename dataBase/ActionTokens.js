const {Schema, model} = require('mongoose');

const {tableNamesEnum, actionTokenTypeEnum} = require('../configs');

const actionTokenSchema = new Schema({
    action_token: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(actionTokenTypeEnum),
        trim:true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: tableNamesEnum.USER
    },
}, { timestamps: true, toObject: { virtuals: true}, toJSON: { virtuals: true } });

actionTokenSchema.pre('findOne', function() {
    this.populate('user_id');
});

module.exports = model(tableNamesEnum.ACTION_TOKENS, actionTokenSchema);
