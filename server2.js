if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

console.log(stripeSecretKey);
console.log(stripePublicKey);

const express = require('express');

const app = express();
const fs = require('fs');
const stripe = require('stripe')(stripeSecretKey);
const User =  require('./src/models/user_schema');
const mongoose = require('mongoose');

//database connection
mongoose.connect('mongodb://admin:admin123@ds155315.mlab.com:55315/donations-shopping-cart',{ useNewUrlParser: true } );


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));

app.get('/', function(req,res){
  res.render('index.ejs');
});

app.get('/donate', function(req,res){
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

app.post('/donate', function(req, res) {
    //fs.readFile('items.json', function(error, data) {
      //if (error) {
      //  res.status(500).end();
      //} else {
        //const itemsJson = JSON.parse(data);
        //const itemsArray = itemsJson.donations.concat(itemsJson.merch);

        // req.body.items.forEach(function(item) {
        //   const itemJson = itemsArray.find(function(i) {
        //     return i.id == item.id;
        //   });
        //   total = total + itemJson.price * item.quantity;
        // });

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
        }).then(function() {
          console.log('Charge Successful');
          res.json({ message: 'Successfully charged items!' });
        }).catch(function() {
          console.log('Charge Fail');
          res.status(500).end();
        });
      //}
    //});
});

app.get('/membership', function(req,res){
  res.render('membership.ejs',{
    stripePublicKey: stripePublicKey
  });
});

app.post('/membership', function(req,res){

    //save to database
    let User = {
        firstName: req.body.items[0].firstName,
        lastName: req.body.items[0].lastName,
        email: req.body.items[0].email,
        phoneNumber: req.body.items[0].phoneNumber
    };


    User
    .find( { email: req.body.items[0].email } ) 
    .exec()
    .then(userItem => {
        if (userItem.length > 0) {
            res.status(400);
        } else {
            User
                .save()
                .then(result => {
                    console.log(' result: ' +result);
                    return res.status(200);
                }).catch(err => {
                    console.log(' err: ' + err);
                    return res.status(500);
                });
        }
      });

     //make charge
    stripe.charges.create({
      amount: parseFloat(req.body.items[0].amount),
      source: req.body.stripeTokenId,
      currency: 'usd'
    }).then(function() {
      console.log('Charge Successful');
      res.json({ message: 'Successfully charged membership!' });
    }).catch(function() {
      console.log('Charge Fail');
      res.status(500).end();
    });

});

app.get('/confirmation', function(req,res){
    res.render('confirmation.ejs');
});

const hostname= 'localhost';
const port = 3000;
app.listen(port,hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}`);
});
