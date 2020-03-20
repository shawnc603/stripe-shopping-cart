const router = require("express").Router();
const Member =  require('../models/Member');
const mongoose = require('mongoose');

router.get('/search/:type', function(req,res){
    res.render('search.ejs');
});

router.get('/search', function(req,res){
    res.render('search.ejs');
});
  
router.post('/search', function(req,res){

    Member
    .find( { email: req.body.searchItem[0].email } ) 
    .exec()
    .then(userItem => {
        if (userItem.length > 0) {
            res.status(200).json([{
                FirstName: userItem[0].firstName,
                LastName: userItem[0].lastName,
                Email: userItem[0].email,
                PhoneNumber: userItem[0].phoneNumber
            }]);
        } else {
            res.status(404).json({ message: 'User not Found!', status: '2' });
        }
    });
    
});
    

module.exports = router;