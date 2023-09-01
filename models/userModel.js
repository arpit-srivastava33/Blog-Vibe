const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minLength: [6, 'passwaord must be atleast 6 length']
    },
    blog: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Blog',
        }
    ]
}, { timestamps: true })

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;