"use strict";

var db = require('../db/index');

var bcrypt = require('bcryptjs'); //获取用户信息


exports.getUserInfo = function (req, res) {
  var sql = 'select id,username,nickname,email,user_pic from ev_users where id=?';
  db.query(sql, req.user.id, function (err, results) {
    if (err) {
      return res.cc(err);
    }

    if (results.length !== 1) {
      return res.cc('获取失败');
    }

    res.send({
      status: 0,
      message: '获取成功',
      data: results
    });
  });
}; //更新用户信息


exports.updateUserInfo = function (req, res) {
  var sql = 'update ev_users set ? where id=?';
  db.query(sql, [req.body, req.body.id], function (err, results) {
    console.log(results);

    if (err) {
      return res.cc(err);
    }

    if (results.affectedRows !== 1) {
      return res.cc('更改失败，稍后再试');
    }

    res.send({
      status: 0,
      message: '修改成功',
      data: results
    }); // db.query('select * from ev_users where id=?',req.body.id,(err,results)=>{
    //     if (err) {
    //         return res.cc(err)
    //     }
    //     if (results.length!==1) {
    //         return res.cc('更改失败，稍后再试')
    //     }
    // })
  });
}; //重置用户密码


exports.updatePassword = function (req, res) {
  var sql = 'select *from ev_users where id=?';
  db.query(sql, req.user.id, function (err, results) {
    if (err) {
      return res.cc(err);
    }

    if (results.length !== 1) {
      return res.cc('用户不存在');
    }

    var compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password);
    if (!compareResult) return res.cc('原密码错误！');
    var sql = "update ev_users set password=? where id=?";
    var newPwd = bcrypt.hashSync(req.body.newPwd, 10);
    db.query(sql, [newPwd, req.user.id], function (err, results) {
      if (err) {
        return res.cc(err);
      }

      if (results.affectedRows !== 1) {
        return res.cc('修改失败');
      }

      res.send({
        status: 0,
        message: '修改成功',
        data: results
      });
    });
  });
}; //更新用户头像


exports.updateAvatar = function (req, res) {
  var sql = 'update ev_users set user_pic=? where id =?';
  db.query(sql, [req.body.avatar, req.user.id], function (err, results) {
    if (err) {
      return res.cc(err);
    }

    if (results.affectedRows !== 1) {
      res.cc('修改失败');
    }

    res.send({
      status: 0,
      message: '更新头像成功'
    });
  });
};