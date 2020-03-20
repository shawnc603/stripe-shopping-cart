const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const { indexController, membershipController, donateController, confirmController,paymentController, educationController, searchController } = require("./controllers");

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));
const mongoose = require('mongoose');

//database connection
//const DB_URI = process.env.MONGO_DB_URI ? process.env.MONGO_DB_URI: "mongodb://localhost:27017/app";
mongoose.connect('mongodb://admin:admin123@ds155315.mlab.com:55315/donations-shopping-cart',{ useNewUrlParser: true } );



app.use(
  session({
    secret: "very secret", // never save the production secret in your repo
    resave: false,
    saveUninitialized: true
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexController, membershipController,donateController, confirmController, paymentController, educationController, searchController);

//mongoose.connect(DB_URI);

module.exports = app;
