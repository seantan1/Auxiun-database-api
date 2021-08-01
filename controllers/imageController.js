// imageController.js
// Import image model
Image = require('../models/imageModel');
// Handle index actions
exports.index = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        Image.get(function (err, images) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Images retrieved successfully",
                data: images
            });
        });
    }
    else {
        res.json('Not authorised');
    }
};
// Handle create image actions
exports.new = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        var image = new Image();
        image.user_id = req.body.user_id ? req.body.user_id : image.user_id;
        image.image_link = req.body.image_link;
        // save the image and check for errors
        image.save(function (err) {
            // Check for validation error
            if (err)
                res.json(err);
            else
                res.json({
                    message: 'New image created!',
                    data: image
                });
        });
    }
    else {
        res.json('Not authorised');
    }
};
// Handle view donation info
exports.view = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        Image.findById(req.params.image_id, function (err, image) {
            if (err)
                res.send(err);
            res.json({
                message: 'image details loading..',
                data: image
            });
        });
    }
    else {
        res.json('Not authorised');
    }
};
// Handle update image info
exports.update = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        Image.findById(req.params.image_id, function (err, image) {
            if (err)
                res.send(err);
            image.user_id = req.body.user_id ? req.body.user_id : image.user_id;
            image.image_link = req.body.image_link;
            // save the image and check for errors
            image.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'image Info updated',
                    data: image
                });
            });
        });
    }
    else {
        res.json('Not authorised');
    }
};
// Handle delete donation
exports.delete = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        Image.remove({
            _id: req.params.image_id
        }, function (err, image) {
            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: 'image deleted'
            });
        });
    }
    else {
        res.json('Not authorised');
    }
};

// Handle fetch all images by user_id
exports.fetchImagesByUserId = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        Image.find()
        .where('user_id').equals(req.body.user_id)
        .exec(function (err, images) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Images retrieved successfully",
                data: images
            });
        })
    }
    else {
        res.json('Not authorised');
    }
};