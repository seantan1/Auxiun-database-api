// userController.js

// For hashed passwords
const bcrypt = require("bcryptjs")
const saltRounds = 10
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
exports.new = async (req, res) => {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        var user = new User();
        user.email = req.body.email ? req.body.email : user.email;
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.password_hash = await bcrypt.hash(req.body.password_hash, saltRounds)
        // save the user and check for errors
        user.save(function (err) {
            // Check for validation error
            if (err)
                return res.json(err);
            else
                return res.json({
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
// This function does not update the password for a user.
exports.update =  function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        User.findById(req.params.user_id, function (err, user) {
            if (err){
                return res.send(err);
            }

            // save the user and check for errors
            user.firstname = req.body.firstname ? req.body.firstname : user.firstname;
            user.lastname = req.body.lastname ? req.body.lastname : user.lastname;
            user.save(function (err) {
                // If there is an error, return
                if (err){
                    return res.json(err);
                } 
                else {
                    return res.json({
                        status: "success",
                        message: 'User Info updated',
                        data: user
                    });
                }
            });  
        });
    } else {
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

exports.login = async (req, res) => {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        const user = await User.findOne({email: req.body.email})
        // Compare passwords
        if(!user){
            return res.json({status: "fail",
                            message: "No user found"})
        }
        const passwordMatch = await bcrypt.compare(req.body.password_hash, user.password_hash)
        if(passwordMatch){
            return res.json({status: "success",
                            data: user})
        } else {
            return res.json({status: "fail",
                            message: "Passwords did not match"})
        }
    }
    else {
        res.json('Not authorised');
    }
};

exports.updatePassword = async (req, res) => {
    if(req.body.apikey == process.env.PRIVATE_API_KEY) {
        const user = await User.findById(req.params.user_id)
        // Compare passwords
        const passwordMatch = await bcrypt.compare(req.body.old_password, user.password_hash)
        if(passwordMatch){
            const newPasswordHash = await bcrypt.hash(req.body.new_password, saltRounds)
            const result = await user.update({password_hash: newPasswordHash})
            const newUser = await User.findById(req.params.user_id)
            return res.json({ status: "success",
                            data: newUser})
        } else {
            return res.json({
                status: 'fail',
                message: 'Old password does not match existing password'
            });
        }
    } else {
        return res.json('Not authorised');
    }
}


