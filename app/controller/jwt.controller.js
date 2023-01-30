const express = require("express");
const jwt = require("jsonwebtoken");
const keys = require('../middleware/secret');
const userdao = require('../dao/user.dao');

const router = express.Router();

var refreshTokenList = [];

router.post("/login", function (req, res) {

    var obj = userdao.findUserByUsernamePassowd(req.body.username, req.body.password);
    if(obj){
        const user = { name: obj.email };
        const accessToken = jwt.sign(user,keys.ACCESS_KEY , {expiresIn: "30s"});
        const refreshToken = jwt.sign(user, keys.REFRESH_KEY, {expiresIn: "24h"});
        refreshTokenList.push(refreshToken);
        res.send({ accessToken, refreshToken });
    }else{
        res.status(404);
        res.send("Invalid username password!");
    }
  
});

router.post("/token", function (req, res) {
  const refreshToken = req.body.refreshToken;
  if (refreshToken == null) res.sendStatus(401);
  if (!refreshTokenList.includes(refreshToken)) res.sendStatus(403);
  jwt.verify(refreshToken, keys.REFRESH_KEY, function (err, user) {
    if (err) res.sendStatus(403);
    const accessToken = jwt.sign({ name: user.email }, keys.ACCESS_KEY, {expiresIn: "10s"});
    res.send({ accessToken });
  });
});

router.delete("/logout", function (req, res) {
  const refreshToken = req.body.refreshToken;
  refreshTokenList = refreshTokenList.filter((tkn) => tkn !== refreshToken);
  res.sendStatus(204);
});

router.post('/signup',(req,res,next)=>{
    const user = req.body.user;
    if(typeof userdao.addUser(user) == 'number'){
        res.status(200).json({'user': user});
    }else{
        res.status(400);
        res.send("Register Failed!");
    }
});

module.exports = router;
