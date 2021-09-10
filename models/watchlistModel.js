// watchlistModel.js
var mongoose = require('mongoose');

// Setup schema
var watchlistSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    game_id_item_id_pair: {
        type: String,
        required: true,
    }
});

// Export watchlist model
var Watchlist = module.exports = mongoose.model('watchlist', watchlistSchema);
module.exports.get = function (callback, limit) {
    Watchlist.find(callback).limit(limit);
}