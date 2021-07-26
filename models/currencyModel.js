// donationModel.js
var mongoose = require('mongoose');
// Setup schema
var currencySchema = mongoose.Schema({
    streamer_id: {
        type: String,
        required: true
    },
    currency_symbol: {
        type: String,
        required: true
    },
    currency_address: {
        type: String,
        required: true
    },
    currency_threshold: {
        type: mongoose.Types.Decimal128,
        required: true
    },
});
// Export Currency model
var Currency = module.exports = mongoose.model('currency', currencySchema);
module.exports.get = function (callback, limit) {
    Currency.find(callback).limit(limit);
}