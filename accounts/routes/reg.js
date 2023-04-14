const express = require('express')

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
    res.render('success', { msg: '注册成功', url: '/login' })
  }).catch(err => {
    res.status(500).send('注册失败，请稍后注册！')
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
    //写入session
    req.session.username = data.username
    req.session._id = data._id
    res.render('success', { msg: '登录成功', url: '/account' })
  }).catch(err => {
    res.status(500).send('登陆失败，请稍后再试')
  })
})

//退出登录
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.render('success', { msg: '退出成功', url: '/login' })
  })
})
module.exports = router