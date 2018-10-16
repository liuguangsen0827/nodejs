var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.post('/login', function(req, res, next) {
    var name = req.body.username;
    var pwd = req.body.password;
    if(name==='liu' && pwd==='123'){
        res.json({
                code:'1',
                msg:'登录成功', 
                token: jwt.sign({
                       exp: Math.floor(Date.now() / 1000) + (60*60),
                },'liu')
           })
    } else {
        res.json({
            code:'-1',
            msg:'用户或密码错误' 
            })
          }         
  });
router.get('/list', function(req, res, next){
    res.json({a:1,b:2});
});
module.exports = router;