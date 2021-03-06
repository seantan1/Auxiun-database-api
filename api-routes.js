// api-routes.js
// Initialize express router
let router = require('express').Router();
// multer for upload image files
var multer = require('multer');

// function to upload image files
var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

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
// import game controller
var gameController = require('./controllers/gameController');
// import nftMetadata controller
var nftMetadataController = require('./controllers/nftMetadataController');
// import watchlist controller
var watchlistController = require('./controllers/watchlistController');

// user routes
router.route('/users')
    .get(userController.index)
    .post(userController.new);

router.route('/users/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);

router.route('/users/update-password/:user_id')
    .patch(userController.updatePassword)

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

// game routes
router.route('/games')
    .get(gameController.index)
    .post(gameController.new);

router.route('/games/:game_id')
    .get(gameController.view)
    .patch(gameController.update)
    .put(gameController.update)
    .delete(gameController.delete);

// nftMetadata routes
router.route('/nftMetadatas')
    .get(nftMetadataController.index)
    .post(upload.single('item_image'), nftMetadataController.new);

router.route('/nftMetadatas/:nftMetadata_id')
    .get(nftMetadataController.view)
    .patch(nftMetadataController.update)
    .put(nftMetadataController.update)
    .delete(nftMetadataController.delete);

router.route('/nft/:game_id/:item_id')
    .get(nftMetadataController.fetchNftMetadata);

router.route('/nftMetadatas-fetchByGameId/:game_id')
    .get(nftMetadataController.fetchNFTMetadatasByGameId);

router.route('/nftMetadata-increase-popularity/:nftMetadata_id')
    .put(nftMetadataController.increaseNFTMetadataPopularity)
    .patch(nftMetadataController.increaseNFTMetadataPopularity);

// watchlist routes
router.route('/watchlists')
    .get(watchlistController.index)
    .post(watchlistController.new);

router.route('/watchlists/:watchlist_id')
    .get(watchlistController.view)
    .patch(watchlistController.update)
    .put(watchlistController.update)
    .delete(watchlistController.delete);

router.route('/watchlists-fetchWatchlistsByUserId/:user_id')
    .get(watchlistController.fetchWatchlistsByUserId)

// router.route('/purchase/:tokenId')
// .post(transactionController.new);
// Export API routes
module.exports = router;