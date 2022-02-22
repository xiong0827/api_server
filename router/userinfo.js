const express =require('express');
const router=express.Router();
const userinfo=require('../router_handle/userinfo')

const expressjoi=require('@escook/express-joi')
const {update_userinfo_schema,update_password_schema,update_avatar_schema}=require('../schema/user')
router.get('/userinfo',userinfo.getUserInfo)
router.post('/userinfo',expressjoi(update_userinfo_schema),userinfo.updateUserInfo)
router.post('/updatepwd',expressjoi(update_password_schema),userinfo.updatePassword)
router.post('/update/avatar',expressjoi(update_avatar_schema),userinfo.updateAvatar)
module.exports=router