const router = require("express").Router();

const { confirmService } = require("../services");

router.get('/confirmation', async(req,res) =>{
    if (Object.keys(req.query).length !== 0){
         await confirmService.sendEmail(req.query.email, req.query.transId, req.query.message);
         res.render('confirmation.ejs',{
            email: req.query.email,
            transId: req.query.transId
        });
    }
    res.render('confirmation.ejs');
});


module.exports = router;