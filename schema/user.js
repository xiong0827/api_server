//导入定义规则的包
const joi = require('joi');

//定义用户名和密码的验证规则
const username = joi.string().required().alphanum().min(1).max(10);
const password = joi.string().pattern(/^[\S]{6,12}$/).required();
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email();
const avatar=joi.string().required().dataUri()

exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email,
    },
}
exports.reg_login_schema = {
    body: {
        username,
        password,

    }
}
exports.update_password_schema = {
    body: {
        // 使用 password 这个规则，验证 req.body.oldPwd 的值
        oldPwd: password,
        // 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd 的值
        // 解读：
        // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
        // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
        // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),
    },
}
exports.update_avatar_schema={
    body:{
    avatar
    }
}
