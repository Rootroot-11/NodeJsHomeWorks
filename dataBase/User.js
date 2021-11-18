const {Schema, model} = require('mongoose');
const userRoles = require('../configs/user-roles.enum');
const {passwordService} = require('../service');

const userSchema = new Schema({
    user_name: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        select: false,
        required: true
    },
    user_type: {
        type: String,
        enum: Object.values(userRoles),
        required: true
    },
}, {timestamps: true});

userSchema.virtual('fullName').get(function() {
    return `${this.name} ${this.role} HA-HA`;
});

userSchema.methods = {
    comparePassword(password) {
        return passwordService.compare(password, this.password);
    }
};

userSchema.statics = {
    async createUserWithHashPassword(userObject) {
        const hashedPassword = await passwordService.hash(userObject.password);

        return this.create({...userObject, password: hashedPassword});
    }
};

module.exports = model('user', userSchema);
