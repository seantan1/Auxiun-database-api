// donationModel.js
var mongoose = require('mongoose');
// Setup schema
var donationSchema = mongoose.Schema({
    donor: {
        type: String,
        required: true
    },
    amount: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    txlink: {
        type: String,
        required: true
    },
    streamer_id: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Donation model
var Donation = module.exports = mongoose.model('donation', donationSchema);
module.exports.get = function (callback, limit) {
    Donation.find(callback).limit(limit);
}