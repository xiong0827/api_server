"use strict";

var joi = require('joi');

var name = joi.string().required();
var alias = joi.string().required().alphanum();
var id = joi.number().integer().min(1).required();
exports.add_cate_schema = {
  body: {
    name: name,
    alias: alias
  }
};
exports.delete_cate_schema = {
  params: {
    id: id
  }
};
exports.get_cate_schema = {
  params: {
    id: id
  }
};
exports.update_cate_schema = {
  body: {
    id: id,
    name: name,
    alias: alias
  }
};