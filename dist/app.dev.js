"use strict";

//导入expres
var express = require('express');

var joi = require('joi'); //创建服务器的实例对象


var app = express(); //导入并配置cors中间件

var cors = require('cors'); // 解析 token 的中间件


var expressJWT = require('express-jwt'); // 导入配置文件


var config = require('./config');

app.use(cors()); //配置解析表单数据的中间件

app.use(express.urlencoded({
  extended: false
})); //一定要在路由之前封装一个res.cc函数

app.use(function (req, res, next) {
  res.cc = function (err) {
    var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    res.send({
      status: status,
      message: err instanceof Error ? err.message : err
    });
  };

  next();
});
app.use(expressJWT({
  credentialsRequired: false,
  //设置为false就不进行校验
  algorithms: ['HS256'],
  //必须设置
  secret: config.jwtSecretKey
}).unless({
  path: [/^\/api\//]
})); //导入并使用用户路由模块里

var userRouter = require('./router/user');

app.use('/api', userRouter); //导入使用用户信息的路由模块

var userinfoRouter = require('./router/userinfo');

app.use('/my', userinfoRouter); // 导入并使用文章分类路由模块

var artCateRouter = require('./router/artcate'); // 为文章分类的路由挂载统一的访问前缀 /my/article


app.use('/my/article', artCateRouter); // 导入并使用文章路由模块

var articleRouter = require('./router/article'); // 为文章的路由挂载统一的访问前缀 /my/article


app.use('/my/article', articleRouter); //错误中间件

app.use(function (err, req, res, next) {
  console.log(err.name);

  if (err instanceof joi.ValidationError) {
    return res.cc(err);
  } // 捕获身份认证失败的错误


  if (err.name === 'UnauthorizedError') {
    return res.cc('失败');
  }

  res.cc(err);
}); //启动服务器

app.listen(3007, function () {
  console.log('api server running at http://127.0.0.1:3007');
});