// donationModel.js
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
    },
    wallet_address: {
        type: String,
        required: true
    }
});
userSchema.plugin(uniqueValidator); // unique validator
// Export User model
var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}