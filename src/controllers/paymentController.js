const router = require("express").Router();
const mongoose = require('mongoose');
const Payment = require("../models/Payment");
const { paymentService } = require("../services");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

console.log('stripeSecretKey' + stripeSecretKey);
console.log('stripePublicKey' + stripePublicKey);

const stripe = require('stripe')(stripeSecretKey);

router.get('/payment', function(req,res){
    res.render('payment.ejs',{
      stripePublicKey: stripePublicKey
    });
});

router.post('/payment', function(req,res){
    //make charge
    stripe.charges.create({
            amount: parseFloat(req.body.items[0].amount),
            source: req.body.stripeTokenId,
            currency: 'usd'
        }).then(result => {
            console.log('Charge Successful ' + result);

            const  PaymentItem = new Payment({
              _id: new mongoose.Types.ObjectId(),
              transId: result.id,
              amount: result.amount,
              email: result.billing_details.name
            }); 
            PaymentItem
              .save()
              .then(paymentItem => {
                return res.json({ 
                  message: 'Credit card has been charged successfully',  
                  transId: paymentItem.transId,
                  amount: paymentItem.amount,
                  email: paymentItem.email
                });
              }).catch(err => {
                  console.log('error' + err);
              }); 
        }).catch(err => {
            console.err(err);
        });
});

module.exports = router;