const { Schema, model } = require('mongoose');

const ActionTokenTypeEnum = require('../configs/action-token-type.enum');
const {FORGOT_PASSWORD} = require('../configs');

const actionTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        trim: true
    },
    token_type: {
        type: String,
        required: true,
        enum: Object.values(ActionTokenTypeEnum),
        default: FORGOT_PASSWORD
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },

}, { timestamps: true });

actionTokenSchema.pre('findOne', function() {
    this.populate('user_id');
});

module.exports = model('action_token', actionTokenSchema);
