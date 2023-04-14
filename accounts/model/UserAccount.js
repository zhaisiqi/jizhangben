const mongoose = require('mongoose')

//创建文档的结构对象
let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

//模型user将会对应users集合,users集合的名称，UserSchema操作的对象
let UserModel = mongoose.model("users", userSchema)

module.exports = UserModel