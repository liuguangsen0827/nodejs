var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var expressJWT = require('express-jwt');
var logger = require('morgan');
var api = require('./api/api');
var app = express();
// token
// jwt.sign({
//   exp: Math.floor(Date.now() / 1000) + (60 * 60),
//   data: 'liu'
// }, 'secret' , function(err, token){
//   console.log(token)
// });
var secretOrPrivateKey = "liu"  //加密token 校验token时要使用
app.use(expressJWT({
    secret: secretOrPrivateKey   
}).unless({
    path: ['/api/login']  //除了这个地址，其他的URL都需要验证
}));
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {   
      //  这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
    res.json({
      code:'401',
      msg:'token失效'
 })
  }
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');  
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 路由
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/login',usersRouter)
// api
app.use('/api', api);
app.use('/api/*', function(req, res, next){
  res.json({code:404});
})
app.use('*',function(req, res, next){
  console.log(res.Urls)
  res.render('404');
})
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// app.listen(3000, function() {
//   console.log("App started on port 3000");
// });
// app.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Credentials", true)
//     res.header("Access-Control-Allow-Origin", "*")
//     res.header("Access-Control-Allow-Headers", "X-Requested-With")
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
//     res.header("X-Powered-By", ' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8")
//     next()
//   })
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});
app.listen('3000','127.0.0.1')
// console.log(app.get)
module.exports = app;
