const express=require('express');
const router=express.Router();
const artcate_handler=require('../router_handle/artcate')
const expressjoi=require('@escook/express-joi')
const {add_cate_schema,delete_cate_schema,get_cate_schema,update_cate_schema}=require('../schema/article')
router.get('/cates',artcate_handler.getArticleCates)
router.post('/addcates', expressjoi(add_cate_schema),artcate_handler.addArticleCates)
router.get('/deletecate/:id', expressjoi(delete_cate_schema),artcate_handler.deleteCateById)
router.get('/cates/:id',expressjoi(get_cate_schema), artcate_handler.getArtCateById)
router.post('/updatecate', expressjoi(update_cate_schema),artcate_handler.updateCateById)
module.exports=router;