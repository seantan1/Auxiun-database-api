// gameModel.js
var mongoose = require('mongoose');
// Setup schema
var gameSchema = mongoose.Schema({
    game_name: {
        type: String,
        required: true
    }
});
// Export Game model
var Game = module.exports = mongoose.model('game', gameSchema);
module.exports.get = function (callback, limit) {
    Game.find(callback).limit(limit);
}