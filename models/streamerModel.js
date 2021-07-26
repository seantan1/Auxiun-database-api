// donationModel.js
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator'); // unique validator
// Setup schema
var streamerSchema = mongoose.Schema({
    username: {
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
    },
    profile_image_link: {
        type: String,
        required: false
    },
});
streamerSchema.plugin(uniqueValidator); // unique validator
// Export Streamer model
var Streamer = module.exports = mongoose.model('streamer', streamerSchema);
module.exports.get = function (callback, limit) {
    Streamer.find(callback).limit(limit);
}