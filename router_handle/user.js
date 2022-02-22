const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const config = require('../config')
exports.regUser = (req, res) => {
    //获取客户端提交到服务器的用户信息
    const userinfo = req.body
    // if (!userinfo.username || !userinfo.password) {
    //     res.send('用户名和密码不能为空')
    // }
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, [userinfo.username], (err, results) => {
        if (err) {
            // return res.send({
            //     status: 1,
            //     message: err.messages
            // })
            res.cc(err)
        }
        if (results.length > 0) {
            // return res.send({
            //     status: 1,
            //     message: '用户名被占用，请更换其他用户名！'
            // })
            return res.cc('用户名被占用，请更换其他用户名！')
        }
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        const sql = 'insert into ev_users set ?'
        db.query(sql, {
            username: userinfo.username,
            password: userinfo.password
        }, (err, results) => {
            if (err) {
                return res.send({
                    status: 1,
                    message: err.message
                })
            }
            if (results.affectedRows !== 1) {
                // return res.send({status:1,message:'注册用户失败请稍后再试'})
                res.cc('注册用户失败请稍后再试')

            }
            // res.send({ status: 0, message: '注册成功' })
            res.cc('注册成功', 0)
            console.log(userinfo);
        })
    })
}
exports.login = (req, res) => {
    const userinfo = req.body
    const sql = 'select *from ev_users where username=?'
    db.query(sql, userinfo.username, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length !== 1) {
            res.cc('登录失败');
        }
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult) {
            res.cc('登录失败')
        }
        //在服务器生成token字符串 不包括密码和头像
        const user = {
            ...results[0],
            password: '',
            user_pic: ''
        }
        const tokenstr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        res.send({
            status: 0,
            message: '登录成功',
            //为了方便客户端使用token 拼接了bearer
            token: 'Bearer ' + tokenstr
        })
        // res.cc('登录成功', 0)
    })
    console.log(req.user);
}