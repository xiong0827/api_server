"use strict";

var express = require('express');

var router = express.Router();

var artcate_handler = require('../router_handle/artcate');

var expressjoi = require('@escook/express-joi');

var _require = require('../schema/article'),
    add_cate_schema = _require.add_cate_schema,
    delete_cate_schema = _require.delete_cate_schema;

router.get('/cates', artcate_handler.getArticleCates);
router.post('/addcates', expressjoi(add_cate_schema), artcate_handler.addArticleCates);
router.get('/deletecate/:id', expressjoi(delete_cate_schema), artcate_handler.deleteCateById);
module.exports = router;