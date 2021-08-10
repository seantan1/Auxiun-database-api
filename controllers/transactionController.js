
// Import model
Transaction = require('../models/transactionModel');
// Handle index actions
exports.index = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        Transaction.get(function (err, transactions) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "transactions retrieved successfully",
                data: transactions
            });
        });
    }
    else {
        res.json('Not authorised');
    }
};

// Log transaction
exports.new = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        var transaction = new Transaction()
        transaction.transaction_id = req.body.transaction_id
        transaction.buyer = req.body.buyer
        transaction.seller = req.body.seller
        transaction.token_id = req.body.token_id
        transaction.amount = req.body.amount
        transaction.timestamp = req.body.timestamp
        // save the transaction and check for errors
        transaction.save(function (err) {
            // Check for validation error
            if (err)
                res.json(err);
            else
                res.json({
                    message: 'New user created!',
                    data: transaction
                });
        });
    }
    else {
        res.json('Not authorised');
    }
};