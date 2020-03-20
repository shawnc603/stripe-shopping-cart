const router = require("express").Router();
const mongoose = require('mongoose');
const Education = require("../models/Education");
const { educationService } = require("../services");

router.get('/education', function(req,res){
    res.render('education.ejs');
});

router.post('/checkEducationById', async(req,res) =>{
    const educationExists = await educationService.getEducationByEmail(req.body.items[0].email.trim());
    var result =  (educationExists.length > 0) ? true: false;
    if(result){
        return res.status(200).json({ message: 'User already registered!', status: '1'});
    }else{
        return res.status(404).json({ message: 'User not Found!', status: '0'});
    }
});

router.post('/education', async (req, res) => {
    const educationExists = await educationService.getEducationByEmail(req.body.items[0].parentEmail);   
    if(educationExists.length > 0){
        return res.status(409).json({ message: 'User already registered!'});
    } else {
        var childrenItems = [];
        for( var i=0; i < req.body.items[0].children.length; i++)
        {
            childrenItems.push(req.body.items[0].children[i]);
        }
        //save to database
        let education = new Education({
            _id: new mongoose.Types.ObjectId(),
            parentFirstName: req.body.items[0].parentFirstName,
            parentLastName: req.body.items[0].parentLastName,
            parentEmail: req.body.items[0].parentEmail,
            parentPhoneNumber: req.body.items[0].parentPhoneNumber,
            children: childrenItems
        });

        const educationReturned = await educationService.saveEducation(education);
        return res.status(201).json({ message: 'Successfully registered!',  education: educationReturned });
    }
});
  

module.exports = router;