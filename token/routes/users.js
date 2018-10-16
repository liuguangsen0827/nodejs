var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});
router.post('/', function(req, res, next) {
  var name = req.body.username;
  var pwd = req.body.password;
  if(name==='liu' && pwd==='123'){
      res.render('index',{
        username:name,
        password:pwd
      })

  } else {

  }
});
module.exports = router;
