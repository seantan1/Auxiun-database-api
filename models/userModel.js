const bcrypt = require('bcrypt')
const saltRounds = 10;
// userModel.js
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator'); // unique validator
// Setup schema
var userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password_hash: {
        type: String,
        required: true
    }
});


// Before saving, hash the password
userSchema.pre('save', (next) => {
    var user = this;
    if(user.isModified("password_hash")) {
        bcrypt.getSalt(saltRounds, (err, salt) => {
            if(err){
                return next(err)
            }
            bcrypt.hash(user.password_hash, salt, (err, hash) => {
                if(err){
                    return next(err)
                }
                user.password_hash = hash
            })
        })
    } else {
        next()
    }
  
})
userSchema.plugin(uniqueValidator); // unique validator
// Export User model
var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}