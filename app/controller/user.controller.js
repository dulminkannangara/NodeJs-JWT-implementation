const express = require('express')
const userdao = require('../dao/user.dao');

const router = express.Router();

router.get('/test',function(req,res,next){

    res.status(200).json({
        'message' : 'Success'
    });

});

router.get('/:id',(req,res,next)=>{
    var u = userdao.getUser(req.params.id);
    if(typeof u != 'undefined'){
        res.status(200).json({
            'user' : u
        });
    }else{
        res.status(400);
        res.send("Invalid User ID");
    }
});

router.patch('/',(res,req,next)=>{
    const user = req.body.user;
    if(typeof userdao.updateUser(user)!='undefined'){
        req.status(200).json({
            'user': user
        });
    }else{
        res.status(400);
        res.send('Invalid Credentials!');
    }
});

module.exports = router;