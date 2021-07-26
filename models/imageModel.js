// donationModel.js
var mongoose = require('mongoose');
// Setup schema
var imageSchema = mongoose.Schema({
    streamer_id: {
        type: String,
        required: true
    },
    image_link: {
        type: String,
        required: true
    }
});
// Export Image model
var Image = module.exports = mongoose.model('image', imageSchema);
module.exports.get = function (callback, limit) {
    Image.find(callback).limit(limit);
}