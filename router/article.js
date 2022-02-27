const express=require('express');
const router=express.Router();
const multer=require('multer')
const path=require(path)
const upload=multer
const article_handler=require('../router_handle/article')
router.post('/add',article_handler.addArticle)
module.exports=router