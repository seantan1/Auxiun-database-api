// nftMetadataController.js
// Import nftMetadata model
NftMetadata = require('../models/nftMetadataModel');
// Handle index actions
exports.index = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        NftMetadata.get(function (err, nftMetadatas) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "nftMetadatas retrieved successfully",
                data: nftMetadatas
            });
        });
    }
    else {
        res.json('Not authorised');
    }
};
// Handle create nftMetadata actions
exports.new = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        var nftMetadata = new NftMetadata();
        nftMetadata.game_id_item_id_pair = req.body.game_id + "_" + req.body.item_id;
        nftMetadata.game_id = req.body.game_id;
        nftMetadata.item_id = req.body.item_id;
        nftMetadata.item_name = req.body.item_name;
        nftMetadata.item_description = req.body.item_description;
        nftMetadata.item_image_link = req.body.item_image_link;
        // save the nftMetadata and check for errors
        nftMetadata.save(function (err) {
            // Check for validation error
            if (err)
                res.json(err);
            else
                res.json({
                    message: 'New NFT Metadata created!',
                    data: nftMetadata
                });
        });
    }
    else {
        res.json('Not authorised');
    }
};
// Handle view nftMetadata info
exports.view = function (req, res) {
    NftMetadata.findById(req.params.nftMetadata, function (err, nftMetadata) {
        if (err)
            res.send(err);
        res.json({
            message: 'NFT Metadata found',
            data: nftMetadata
        });
    });
};
// Handle update nftMetadata info
exports.update = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        NftMetadata.findById(req.params.nftMetadata, function (err, nftMetadata) {
            if (err)
                res.send(err);
            nftMetadata.game_id_item_id_pair = req.body.game_id + "_" + req.body.item_id;
            nftMetadata.game_id = req.body.game_id;
            nftMetadata.item_id = req.body.item_id;
            nftMetadata.item_name = req.body.item_name;
            nftMetadata.item_description = req.body.item_description;
            nftMetadata.item_image_link = req.body.item_image_link;
            // save the nftMetadata and check for errors
            nftMetadata.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'NFT Metadata info updated',
                    data: nftMetadata
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
        NftMetadata.remove({
            _id: req.params.nftMetadata_id
        }, function (err, nftMetadata) {
            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: 'NFT Metadata deleted'
            });
        });
    }
    else {
        res.json('Not authorised');
    }
};

// Handle fetchNftMetadata function
exports.fetchNftMetadata = function (req, res) {
    User.find()
        .where('game_id_item_id_pair').equals(req.params.game_id + "_" + req.params.item_id)
        .exec(function (err, nftMetadata) {
            if (err)
                res.send(err);
            if (nftMetadata.length == 0) {
                res.json({
                    status: "error",
                    message: 'NFT Metadata not found'
                });
            }
            else {
                res.json({
                    status: "success",
                    message: 'NFT Metadata found',
                    data: nftMetadata
                });
            }
        })
};