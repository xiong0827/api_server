"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var db = require('../db/index');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var config = require('../config');

exports.regUser = function (req, res) {
  //获取客户端提交到服务器的用户信息
  var userinfo = req.body; // if (!userinfo.username || !userinfo.password) {
  //     res.send('用户名和密码不能为空')
  // }

  var sqlStr = 'select * from ev_users where username=?';
  db.query(sqlStr, [userinfo.username], function (err, results) {
    if (err) {
      // return res.send({
      //     status: 1,
      //     message: err.messages
      // })
      res.cc(err);
    }

    if (results.length > 0) {
      // return res.send({
      //     status: 1,
      //     message: '用户名被占用，请更换其他用户名！'
      // })
      return res.cc('用户名被占用，请更换其他用户名！');
    }

    userinfo.password = bcrypt.hashSync(userinfo.password, 10);
    var sql = 'insert into ev_users set ?';
    db.query(sql, {
      username: userinfo.username,
      password: userinfo.password
    }, function (err, results) {
      if (err) {
        return res.send({
          status: 1,
          message: err.message
        });
      }

      if (results.affectedRows !== 1) {
        // return res.send({status:1,message:'注册用户失败请稍后再试'})
        res.cc('注册用户失败请稍后再试');
      } // res.send({ status: 0, message: '注册成功' })


      res.cc('注册成功', 0);
      console.log(userinfo);
    });
  });
};

exports.login = function (req, res) {
  var userinfo = req.body;
  var sql = 'select *from ev_users where username=?';
  db.query(sql, userinfo.username, function (err, results) {
    if (err) {
      return res.cc(err);
    }

    if (results.length !== 1) {
      res.cc('登录失败');
    }

    var compareResult = bcrypt.compareSync(userinfo.password, results[0].password);

    if (!compareResult) {
      res.cc('登录失败');
    } //在服务器生成token字符串 不包括密码和头像


    var user = _objectSpread({}, results[0], {
      password: '',
      user_pic: ''
    });

    var tokenstr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.expiresIn
    });
    res.send({
      status: 0,
      message: '登录成功',
      //为了方便客户端使用token 拼接了bearer
      token: 'Bearer ' + tokenstr
    }); // res.cc('登录成功', 0)
  });
  console.log(req.user);
};