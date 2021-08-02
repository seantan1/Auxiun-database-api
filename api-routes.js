// api-routes.js
// Initialize express router
let router = require('express').Router();
// multer for upload image files
var multer = require('multer');

// function to upload image files
const storage = multer.diskStorage({
    destination: destination,
    filename: (req, file, cb) => {
         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

var upload = multer({ storage: storage });

const uploadNFTMetadataImageFile = (req, res, next) => {
    upload.fields([{ name: 'item_image', maxCount: 1 }])(req, res, (err) => {
        console.log(req.files);
        req.body.item_image = req.files.item_image[0].path.replace('/\\/g', '/');
        next()
    })
}

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
    .post(uploadNFTMetadataImageFile, nftMetadataController.new);

router.route('/nftMetadatas/:nftMetadata_id')
    .get(nftMetadataController.view)
    .patch(nftMetadataController.update)
    .put(nftMetadataController.update)
    .delete(nftMetadataController.delete);

router.route('/nft/:game_id/:item_id')
    .get(nftMetadataController.fetchNftMetadata);

// Export API routes
module.exports = router;