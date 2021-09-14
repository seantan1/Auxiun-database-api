// watchlistController.js
// Import watchlist model
Watchlist = require('../models/watchlistModel');
// Handle index actions
exports.index = function (req, res) {
    if (req.headers.authorization == process.env.PRIVATE_API_KEY) {
        Watchlist.get(function (err, watchlists) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Watchlists retrieved successfully",
                data: watchlists
            });
        });
    }
    else {
        res.json('Not authorised');
    }
};
// Handle create watchlist actions
exports.new = function (req, res) {
    if (req.headers.authorization == process.env.PRIVATE_API_KEY) {
        var watchlist = new Watchlist();
        watchlist.user_id = req.body.user_id ? req.body.user_id : watchlist.user_id;
        watchlist.nftMetadata_id = req.body.nftMetadata_id;
        // save the watchlist and check for errors
        watchlist.save(function (err) {
            // Check for validation error
            if (err)
                res.json(err);
            else
                res.json({
                    message: 'New watchlist created!',
                    data: watchlist
                });
        });
    }
    else {
        res.json('Not authorised');
    }
};

// Handle view donation info
exports.view = function (req, res) {
    Watchlist.findById(req.params.watchlist_id, function (err, watchlist) {
        if (err)
            res.send(err);
        res.json({
            message: 'watchlist details loading..',
            data: watchlist
        });
    });

};
// Handle update watchlist info
exports.update = function (req, res) {
    if (req.headers.authorization == process.env.PRIVATE_API_KEY) {
        Watchlist.findById(req.params.watchlist_id, function (err, watchlist) {
            if (err)
                res.send(err);
            watchlist.user_id = req.body.user_id ? req.body.user_id : watchlist.user_id;
            watchlist.nftMetadata_id = req.body.nftMetadata_id;
            // save the watchlist and check for errors
            watchlist.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'watchlist Info updated',
                    data: watchlist
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
    Watchlist.remove({
        _id: req.params.watchlist_id
    }, function (err, watchlist) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'watchlist deleted'
        });
    });
};

// Handle fetch all watchlists by user_id
exports.fetchWatchlistsByUserId = function (req, res) {
    Watchlist.find()
        .where('user_id').equals(req.params.user_id)
        .exec(function (err, watchlists) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "watchlist retrieved successfully",
                data: watchlists
            });
        })
};