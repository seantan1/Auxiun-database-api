// nftMetadataModel.js
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator'); // unique validator
// Setup schema
var nftMetadataSchema = mongoose.Schema({
    // pair combination of game_id & item_id (e.g. if game_id = 001 and item_id = 010, game_id_item_id_pair would be 001_010)
    // sole purpose is to ensure uniqueness of an item_id within a game
    game_id_item_id_pair: {
        type: String,
        required: true,
        unique: true
    },
    game_id: {
        type: String,
        required: true,
    },
    item_id: {
        type: String,
        required: true,
    },
    item_name: {
        type: String,
        required: true,
    },
    item_description: {
        type: String,
        required: true
    },
    item_popularity: {
        type: String
    },
    item_image: {
        data: Buffer,
        contentType: String
    }
});
nftMetadataSchema.plugin(uniqueValidator); // unique validator
// Export NftMetadata model
var NftMetadata = module.exports = mongoose.model('nftMetadata', nftMetadataSchema);
module.exports.get = function (callback, limit) {
    NftMetadata.find(callback).limit(limit);
}