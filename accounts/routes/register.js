//注册的接口文档
const express = require('express')

//导入包
const jwt = require('jsonwebtoken')

const router = express.Router()

//导入User模型
const UserModel = require('../model/UserAccount.js')

//导入md5包
const md5 = require('md5')
//进行注册页面跳转
router.get('/reg', (req, res) => {
  res.render('reg')
})
//注册
router.post('/reg', (req, res) => {
  let newpassword = md5(req.body.password)
  UserModel.create({ ...req.body, password: newpassword }).then(data => {
    res.json({
      code: '0000',
      msg: '注册成功',
      data: data
    })
  }).catch(err => {
    res.json({
      code: '1006',
      msg: '注册失败',
      data: null
    })
  })
})

//进行登录页面跳转
router.get('/login', (req, res) => {
  res.render('login')
})

//登录
router.post('/login', (req, res) => {
  let { username, password } = req.body
  UserModel.findOne({ username: username, password: md5(password) }
  ).then(data => {
    //创建token
    let token = jwt.sign({
      username: data.username,
      _id: data._id,
    }, 'atguigu', {
      expiresIn: 60 * 60 * 24
    })
    res.json({
      code: '0000',
      msg: '登录成功',
      data: token
    })
  }).catch(err => {
    res.json({
      code: '1007',
      msg: '登录失败',
      data: null
    })
  })
})

//退出登录
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.render('success', { msg: '退出成功', url: '/login' })
  })
})
module.exports = router