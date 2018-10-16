var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
/* GET home page. */
router.get('/index', function(req, res, next) {
  // res.render('index');
  res.send("22")
});

router.get('/', function(req, res, next) {
  // res.render('index');
  res.send("22")
});
router.get('/login', function(req, res, next) {
  // res.type('html');
  res.render('users');
});
router.post('/login', function(req, res, next) {
  var name = req.body.username;
  var pwd = req.body.password;
  if(name==='liu' && pwd==='123'){
      res.json({
        username:name,
        password:pwd,
        token: jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: 'liu'
          },'secret')
      })
  } else {
    res.send('密码或用33户名错误')
  }
});
module.exports = router;
