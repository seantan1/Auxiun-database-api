// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Axiun database API',
    });
});

// import user controller
var userController = require('./controllers/userController');
// import image controller
var imageController = require('./controllers/imageController');
// import nftMetadata controller
var nftMetadataController = require('./controllers/nftMetadataController');

// user routes
router.route('/users')
    .get(userController.index)
    .post(userController.new);

router.route('/users/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);

// streamer login
router.route('/user-login')
    .post(userController.login);

// image routes
router.route('/images')
    .get(imageController.index)
    .post(imageController.new);

router.route('/images/:image_id')
    .get(imageController.view)
    .patch(imageController.update)
    .put(imageController.update)
    .delete(imageController.delete);

router.route('/images-fetchImagesByUserId')
    .post(imageController.fetchImagesByUserId);

// nftMetadata routes
router.route('/nftMetadatas')
    .get(nftMetadataController.index)
    .post(nftMetadataController.new);

router.route('/nftMetadatas/:nftMetadata_id')
    .get(nftMetadataController.view)
    .patch(nftMetadataController.update)
    .put(nftMetadataController.update)
    .delete(nftMetadataController.delete);

router.route('/nft/:game_id/:item_id')
    .get(nftMetadataController.fetchNftMetadata);

// Export API routes
module.exports = router;