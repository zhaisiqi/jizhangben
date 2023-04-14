var express = require('express');
var router = express.Router();
//导入AccountModel模型
const AccountModel = require('../model/AccountModel.js')

//导入moment第三方库
const moment = require('moment')

//导入检测的中间件
const checkLoginMiddle = require('../middlewares/checkLoginMiddle.js')

//添加首页的路由规则
router.get('/', (req, res) => {
  res.redirect('/account')
})

//显示记账本列表
router.get('/account', checkLoginMiddle, function (req, res, next) {
  AccountModel.find().sort('-time').then(data => {
    res.render('list', { accounts: data, moment: moment })
  }).catch(err => res.status(500).send('读取数据失败~~~'))
});

//显示添加记录
router.get('/account/create', function (req, res, next) {
  res.render('create')
});

//新增记录
router.post('/addAccount', checkLoginMiddle, (req, res) => {
  console.log(req.body)
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  }).then(data => {
    res.render('success', { msg: '添加成功喽！', url: '/account' })
  }).catch(err => res.status(500).send('添加数据失败~~~'))

})

//删除记录
router.get('/account/:id', checkLoginMiddle, (req, res) => {
  let id = req.params.id
  AccountModel.deleteOne({ _id: id }).then(data => {
    res.render('success', { msg: '删除成功喽！', url: '/account' })
  }).catch(err => res.status(500).send('删除数据失败~~~'))
})


module.exports = router;
