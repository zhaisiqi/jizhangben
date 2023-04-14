const mongoose = require('mongoose')

//创建文档的结构对象
let AccountSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  time: Date,
  type: {
    type: Number,
    default: -1
  },
  money: {
    type: Number,
    required: true
  },
  remark: String
})

//模型user将会对应users集合,users集合的名称，UserSchema操作的对象
let AccountModel = mongoose.model("accounts", AccountSchema)

module.exports = AccountModel