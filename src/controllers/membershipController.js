const router = require("express").Router();
const mongoose = require('mongoose');
const Member = require("../models/Member");
const { memberService } = require("../services");



router.get('/membership', function(req,res){
    res.render('membership.ejs');
});

router.post('/checkMemberById', async(req,res) =>{
    const memberExists = await memberService.getMemberByEmail(req.body.items[0].email.trim());
    var result =  (memberExists.length > 0) ? true: false;
    if(result){
        return res.status(200).json({ message: 'User already registered!', status: '1'});
    }else{
        return res.status(404).json({ message: 'User not Found!', status: '0'});
    }
});

router.post("/membership",  async (req, res) => {

    const memberExists = await memberService.getMember(req.body.items[0].email);   
    if(memberExists.length > 0){
        return res.status(409).json({ message: 'User already registered!'});
    } else {
        //save to database
        let member = new Member({
            _id: new mongoose.Types.ObjectId(),
            firstName: req.body.items[0].firstName,
            lastName: req.body.items[0].lastName,
            email: req.body.items[0].email,
            phoneNumber: req.body.items[0].phoneNumber,
            payment: req.body.items[0].payment
        });
        const memberReturned = await memberService.saveMember(member);
        return res.status(201).json({ message: 'Successfully registered!', status: '1', member: memberReturned });
    }

  });
  
module.exports = router;