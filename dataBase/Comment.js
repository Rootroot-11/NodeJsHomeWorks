const {Schema, model} = require('mongoose');

const modelNamesEnum = require('../configs/model-names.enum');

const commentSchema = new Schema( {
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: modelNamesEnum.USER
    },
    apartment_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: modelNamesEnum.APARTMENT
    },
    body: {
        type: String,
        required: true,
    }
}, {timestamps: true});

module.exports = model(modelNamesEnum.COMMENT, commentSchema);
