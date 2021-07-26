// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Freya donation API',
    });
});
// Import donation controller
var donationController = require('./controllers/donationController');
// import streamer controller
var streamerController = require('./controllers/streamerController');
// import image controller
var imageController = require('./controllers/imageController');
// import currency controller
var currencyController = require('./controllers/currencyController');

// donation routes
router.route('/donations')
    .get(donationController.index)
    .post(donationController.new);

router.route('/donations/:donation_id')
    .get(donationController.view)
    .patch(donationController.update)
    .put(donationController.update)
    .delete(donationController.delete);

router.route('/donations-top')
    .get(donationController.top);

router.route('/donations-recent')
    .get(donationController.recent);

router.route('/donations-leaderboard')
    .get(donationController.leaderboard);

// streamer routes
router.route('/streamers')
    .get(streamerController.index)
    .post(streamerController.new);

router.route('/streamers/:streamer_id')
    .get(streamerController.view)
    .patch(streamerController.update)
    .put(streamerController.update)
    .delete(streamerController.delete);

// streamer login
router.route('/streamers-login')
    .post(streamerController.login);

// fetch streamer info with username
router.route('/streamers-getStreamerByUsername')
    .post(streamerController.getStreamerByUsername);

// image routes
router.route('/images')
    .get(imageController.index)
    .post(imageController.new);

router.route('/images/:image_id')
    .get(imageController.view)
    .patch(imageController.update)
    .put(imageController.update)
    .delete(imageController.delete);

router.route('/images-fetchImagesByStreamerId')
    .post(imageController.fetchImagesByStreamerId);

// currency routes
router.route('/currencies')
    .get(currencyController.index)
    .post(currencyController.new);

router.route('/currencies/:currency_id')
    .get(currencyController.view)
    .patch(currencyController.update)
    .put(currencyController.update)
    .delete(currencyController.delete);

router.route('/currencies-fetchCurrenciesByStreamerId')
    .post(currencyController.fetchCurrenciesByStreamerId);

// Export API routes
module.exports = router;