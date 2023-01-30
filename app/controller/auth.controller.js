const jwt = require('jsonwebtoken');
const keys = require('../middleware/secret');

module.exports = function (req, res, next) {
  if (req.headers.authorization ) {
    const token = req.headers.authorization;
    if (token == null) res.sendStatus(401);
    else{
        jwt.verify(token, keys.ACCESS_KEY, function (err, user) {
            if (err) res.sendStatus(403);
            else{
                req.user = user;
                next();
            }
            
          });
    }
    
  } else {
    res.sendStatus(401);
  }
};
