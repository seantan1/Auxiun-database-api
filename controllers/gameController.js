// gameController.js
// Import game model
Game = require('../models/gameModel');
// Handle index actions
exports.index = function (req, res) {
    Game.get(function (err, games) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Games retrieved successfully",
            data: games
        });
    });
};
// Handle create game actions
exports.new = function (req, res) {
    if (req.headers.authorization == process.env.PRIVATE_API_KEY) {
        var game = new Game();
        game.game_name = req.body.game_name;
        // save the game and check for errors
        game.save(function (err) {
            // Check for validation error
            if (err)
                res.json(err);
            else
                res.json({
                    message: 'New game created!',
                    data: game
                });
        });
    }
    else {
        res.json('Not authorised');
    }
};
// Handle view donation info
exports.view = function (req, res) {
    Game.findById(req.params.game_id, function (err, game) {
        if (err)
            res.send(err);
        res.json({
            message: 'Game details loading..',
            data: game
        });
    });
};

// Handle update game info
exports.update = function (req, res) {
    if (req.headers.authorization == process.env.PRIVATE_API_KEY) {
        Game.findById(req.params.game_id, function (err, game) {
            if (err)
                res.send(err);
            game.game_name = req.body.game_name;
            // save the game and check for errors
            game.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'Game Info updated',
                    data: game
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
    if (req.headers.authorization == process.env.PRIVATE_API_KEY) {
        Game.remove({
            _id: req.params.game_id
        }, function (err, game) {
            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: 'Game deleted'
            });
        });
    }
    else {
        res.json('Not authorised');
    }
};