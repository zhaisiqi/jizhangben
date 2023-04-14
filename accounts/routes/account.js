//记录的接口文档
var express = require('express');
//导入AccountModel模型
const AccountModel = require('../model/AccountModel.js')
//导入moment第三方库
const moment = require('moment')
//导入中间件
const checkTokenMiddle = require('../middlewares/checkTokenMiddle.js')

var router = express.Router();

//查询记录
router.get('/account', checkTokenMiddle, (req, res, next) => {
  AccountModel.find().sort('-time').then(data => {
    res.json({
      code: '0000',
      msg: '读取成功',
      data: data,
    })
  }).catch(err => {
    res.json({
      code: '1001',
      msg: '读取失败',
      data: null
    })
  })
});

//新增记录
router.post('/addAccount', checkTokenMiddle, (req, res) => {
  console.log(req.body)
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  }).then(data => {
    res.json({
      code: '0000',
      msg: '添加数据成功',
      data: data
    })

  }).catch(err => {
    res.json({
      code: '1002',
      msg: '添加数据失败',
      data: null
    })
  })
})

//删除记录
router.get('/account/:id', checkTokenMiddle, (req, res) => {
  let id = req.params.id
  AccountModel.deleteOne({ _id: id }).then(data => {
    res.json({
      code: '0000',
      msg: '删除成功',
      data: data
    })

  }).catch(err => {
    res.json({
      code: '1003',
      msg: '删除失败',
      data: null
    })
  })
})

//查询单条记录
router.get('/accountOne/:id', checkTokenMiddle, (req, res) => {
  let id = req.params.id
  AccountModel.findById({ _id: id }).then(data => {
    res.json({
      code: '0000',
      msg: '读取单条数据成功',
      data: data
    })
  }).catch(err => {
    res.json({
      code: '1004',
      msg: '读取单条数据失败',
      data: null
    })
  })
})

//局部更新记录
router.patch('/updateAccount/:id', checkTokenMiddle, (req, res) => {
  let { id } = req.params
  AccountModel.updateOne({ _id: id }, req.body).then(data => {
    AccountModel.findById({ _id: id }).then(data => {
      res.json({
        code: '0000',
        msg: '更新成功',
        data: data,
      })
    }).catch(err => {
      res.json({
        code: '1005',
        msg: '更新数据失败',
        data: null
      })
    })
  }).catch(err => {
    res.json({
      code: '1005',
      msg: '更新数据失败',
      data: null
    })
  })
})
module.exports = router;
