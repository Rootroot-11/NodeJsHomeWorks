const {Schema, model} = require('mongoose');
const apartmentTypeEnum = require('../configs/apartment_type.enum');

const apartmentSchema = new Schema ( {
    country: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: Object.values(apartmentTypeEnum),
        required: true
    },
    apartment_squaring: {
        type: Number,
        required: true
    },
    amount_places: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }

}, {timestamps: true});

module.exports = model('apartment', apartmentSchema);
