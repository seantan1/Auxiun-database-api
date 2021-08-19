// transactionModel.js
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator'); // unique validator
// Setup schema
var transactionSchema = mongoose.Schema({
    transaction_id: {
        type: String,
        required: true,
        unique: true
    },
    buyer: {
        type: String,
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    token_id: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
});
userSchema.plugin(uniqueValidator); // unique validator
// Export Transaction model
var Transaction = module.exports = mongoose.model('transaction', transactionSchema);
module.exports.get = function (callback, limit) {
    Transaction.find(callback).limit(limit);
}