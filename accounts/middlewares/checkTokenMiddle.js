//声明中间件
const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
  //获取token
  let token = req.get('token')
  if (!token) {
    return res.json({
      code: '2001',
      msg: 'token缺失',
      data: null
    })
  }
  //校验token
  jwt.verify(token, 'atguigu', (err, data) => {
    if (err) {
      return res.json({
        code: '2002',
        msg: '检验失败',
        data: null
      })
    }
    //如果成功
    next()
  })
}