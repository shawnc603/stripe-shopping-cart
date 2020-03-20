const router = require("express").Router();
const fs = require('fs');
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


router.get('/donate', function(req,res){
    fs.readFile('items.json', function(error, data){
        if(error) {
            res.status(500).end();
        } else {
            res.render('donations.ejs',{
                stripePublicKey: stripePublicKey,
                items: JSON.parse(data)
            });
        }
    });
});

router.post('/donate', function(req, res) {
        let total = 0;
        console.log('body  ' + JSON.stringify(req.body.items));
        req.body.items.forEach(function(item) {
          total = total + item.price * item.quantity * 100;
        });
        console.log('total  ' + total);

        stripe.charges.create({
          amount: parseFloat(total),
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