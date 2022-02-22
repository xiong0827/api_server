const express =require('express')
const router=express.Router()
const user_handler=require('../router_handle/user')


//1导入验证数据的中间件
const expressjoi=require('@escook/express-joi')
//2导入需要的验证规则对象
const {reg_login_schema}=require('../schema/user')
router.post('/reguser',expressjoi(reg_login_schema),user_handler.regUser)
router.post('/login',expressjoi(reg_login_schema),user_handler.login)
    module.exports=router