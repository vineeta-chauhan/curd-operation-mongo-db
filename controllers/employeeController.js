const express= require('express');
var router = express.Router();

router.get('/',(req,res)=>{
    res.render("employee/addOrEdit",{
        viewtitle:"Insert employe data"
    });
});


module.exports= router;