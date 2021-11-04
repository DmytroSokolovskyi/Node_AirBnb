const {Schema, model} = require('mongoose');

const {tableNamesEnum, apartmentsTypeEnum} = require('../configs');

const apartmentsSchema = new Schema({
    country: {
        type: String,
        required: true,
        trim: true
    },
    town: {
        type: String,
        required: true,
        trim:true
    },
    region: {
        type: String,
        required: true,
        trim:true
    },
    area: {
        type: Number,
        required: true,
    },
    rooms: {
        type: Number,
        required: true,
    },
    sleeping_places: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(apartmentsTypeEnum),
        trim: true
    },
    landlord: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: tableNamesEnum.USER
    },
    price_per_day: {
        type: String,
        required: true,
        trim:true
    },
    tenants: [{
        type: Schema.Types.ObjectId,
        ref: tableNamesEnum.USER
    }],
    rating: {
        type:Number,
        min: 1,
        max: 5
    },
    amenities: {
        type: String,
        trim: true
    },

}, { timestamps: true, toObject: { virtuals: true}, toJSON: { virtuals: true } });

apartmentsSchema.virtual('free').get(function() {
    const free = this.tenants.length ? 'false' : 'true';

    return free;
});

// todo  dell
// apartmentsSchema.pre('findOne', function() {
//     this.populate('user_id');
// });

module.exports = model(tableNamesEnum.APARTMENTS, apartmentsSchema);
