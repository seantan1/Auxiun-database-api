// userController.js
// Import user model
User = require('../models/userModel');
// Handle index actions
exports.index = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        User.get(function (err, users) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Users retrieved successfully",
                data: users
            });
        });
    }
    else {
        res.json('Not authorised');
    }
};
// Handle create user actions
exports.new = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        var user = new User();
        user.email = req.body.email ? req.body.email : user.email;
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.password_hash = req.body.password_hash;
        // save the user and check for errors
        user.save(function (err) {
            // Check for validation error
            if (err)
                res.json(err);
            else
                res.json({
                    message: 'New user created!',
                    data: user
                });
        });
    }
    else {
        res.json('Not authorised');
    }
};
// Handle view user info
exports.view = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        User.findById(req.params.user_id, function (err, user) {
            if (err)
                res.send(err);
            res.json({
                message: 'User details loading..',
                data: user
            });
        });
    }
    else {
        res.json('Not authorised');
    }
};
// Handle update user info
exports.update = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        User.findById(req.params.user_id, function (err, user) {
            if (err)
                res.send(err);
            user.email = req.body.email ? req.body.email : user.email;
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.password_hash = req.body.password_hash;
            // save the user and check for errors
            user.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'User Info updated',
                    data: user
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
        User.remove({
            _id: req.params.user_id
        }, function (err, user) {
            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: 'User deleted'
            });
        });
    }
    else {
        res.json('Not authorised');
    }
};

// Handle login function
exports.login = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        User.find()
            .where('email').equals(req.body.email)
            .where('password_hash').equals(req.body.password_hash)
            .exec(function (err, user) {
                if (err)
                    res.send(err);
                if (user.length == 0) {
                    res.json({
                        message: 'fail'
                    });
                }
                else {
                    res.json({
                        message: 'success',
                        data: user
                    });
                }
            })
    }
    else {
        res.json('Not authorised');
    }
};