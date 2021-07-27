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

// Export API routes
module.exports = router;