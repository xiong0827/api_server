"use strict";

var db = require('../db/index');

exports.getArticleCates = function (req, res) {
  var sql = 'select *  from ev_article_cate where is_delete=0 order by id asc';
  db.query(sql, function (err, results) {
    if (err) {
      return res.cc(err);
    } // if (results.length!==1) {
    //   res.cc('获取文章分类失败')
    // }


    res.cc({
      status: 0,
      message: '获取文章列表成功',
      data: results
    });
  });
};

exports.addArticleCates = function (req, res) {
  var sql = 'select * from ev_article_cate where name=? or alias=?';
  db.query(sql, [req.body.name, req.body.alias], function (err, results) {
    if (err) {
      res.cc(err);
    }

    if (results.length == 2) {
      return res.cc('分类名称与别名被占用，请更换后重试！');
    }

    if (results.length == 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) {
      return res.cc('分类名称与别名被占用，请更换后重试！');
    }

    if (results.length === 1 && results[0].name === req.body.name) {
      return res.cc('分类名称被占用，请更换后重试！');
    }

    if (results.length === 1 && results[0].alias === req.body.alias) {
      return res.cc('分类别名被占用，请更换后重试！');
    }

    var sql = "insert into ev_article_cate set ?";
    db.query(sql, req.body, function (err, results) {
      if (err) {
        res.cc(err);
      }

      if (results.affectedRows !== 1) {
        res.cc('增加文章分类失败');
      }

      res.send({
        status: 0,
        message: '新增文章分类成功',
        data: results
      });
    });
  }); //  const sql ='insert into ev_article_cate(name,alias) values(?,?)'
  //  db.query(sql,[req.body.name,req,])
};

exports.deleteCateById = function (req, res) {
  var sql = "update ev_article_cate set is_delete=1 where id=?";
  db.query(sql, req.params.id, function (err, results) {
    if (err) {
      res.cc(err);
    }

    if (results.affectedRows !== 1) {
      res.cc('删除失败');
    }

    res.send({
      status: 0,
      message: '该分类删除成功'
    });
  });
};

exports.getArtCateById = function (req, res) {
  var sql = "select * from ev_article_cate where id=?";
  db.query(sql, req.params.id, function (err, results) {
    // 执行 SQL 语句失败
    if (err) return res.cc(err); // SQL 语句执行成功，但是没有查询到任何数据

    if (results.length !== 1) return res.cc('获取文章分类数据失败！'); // 把数据响应给客户端

    res.send({
      status: 0,
      message: '获取文章分类数据成功！',
      data: results[0]
    });
  });
};

exports.updateCateById = function (req, res) {
  var sql = "select * from ev_article_cate where id<>? and (name=? or alias=?)";
  db.query(sql, [req.body.id, req.body.name, req.body.alias], function (err, results) {
    // 执行 SQL 语句失败
    if (err) return res.cc(err); // 分类名称 和 分类别名 都被占用

    if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！');
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！'); // 分类名称 或 分类别名 被占用

    if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！');
    if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！'); // TODO：更新文章分类

    var sql = "update ev_article_cate set ? where id=?";
    db.query(sql, [req.body, req.body.id], function (err, results) {
      // 执行 SQL 语句失败
      if (err) return res.cc(err); // SQL 语句执行成功，但是影响行数不等于 1

      if (results.affectedRows !== 1) return res.cc('更新文章分类失败！'); // 更新文章分类成功

      res.cc('更新文章分类成功！', 0);
    });
  });
};