"use strict";

var express = require('express');

var router = express.Router();

var userinfo = require('../router_handle/userinfo');

var expressjoi = require('@escook/express-joi');

var _require = require('../schema/user'),
    update_userinfo_schema = _require.update_userinfo_schema,
    update_password_schema = _require.update_password_schema,
    update_avatar_schema = _require.update_avatar_schema;

router.get('/userinfo', userinfo.getUserInfo);
router.post('/userinfo', expressjoi(update_userinfo_schema), userinfo.updateUserInfo);
router.post('/updatepwd', expressjoi(update_password_schema), userinfo.updatePassword);
router.post('/update/avatar', expressjoi(update_avatar_schema), userinfo.updateAvatar);
module.exports = router;