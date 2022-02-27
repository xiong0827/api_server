"use strict";

var express = require('express');

var router = express.Router();

var multer = require('multer');

var path = require(path);

var upload = multer;

var article_handler = require('../router_handle/article');

router.post('/add', article_handler.addArticle);
module.exports = router;