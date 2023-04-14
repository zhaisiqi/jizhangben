module.exports = function (success) {
  const mongoose = require('mongoose')

  //设置 strictQuery 为 true
  mongoose.set('strictQuery', true);

  //连接mongodb数据库
  mongoose.connect('mongodb://127.0.0.1:27017/bili')

  mongoose.connection.on('open', () => {
    success()
  })

  mongoose.connection.on('error', () => {
    console.log('连接失败！')
  })
  mongoose.connection.on('close', () => {
    console.log('连接关闭');
  })
}