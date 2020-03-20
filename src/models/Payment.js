const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    transId: { type: String },
    email: { type: String },
    Amount: { type: String }
});

module.exports = mongoose.model('Payment', paymentSchema);
