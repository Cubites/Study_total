const mongoose = require('mongoose');
const bcrypt = require('bcrtpy');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String
    },
    nickname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

userSchema.methods.comparePassword = function(plainPassword, callback){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){ // isMatch == boolean
        if(err) return callback(err);
        callback(null, isMatch);
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User };