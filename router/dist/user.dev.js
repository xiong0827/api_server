"use strict";

var express = require('express');

var router = express.Router();

var user_handler = require('../router_handle/user'); //1导入验证数据的中间件


var expressjoi = require('@escook/express-joi'); //2导入需要的验证规则对象


var _require = require('../schema/user'),
    reg_login_schema = _require.reg_login_schema;

router.post('/reguser', expressjoi(reg_login_schema), user_handler.regUser);
router.post('/login', expressjoi(reg_login_schema), user_handler.login);
module.exports = router;