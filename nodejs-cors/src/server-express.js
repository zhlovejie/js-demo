const express = require('express')
const app = express()
const port = 3000


function customCORS(req, res, next) {
  if (req.url === '/favicon.ico') {
    res.status(200).end()
  }
  const origin = req.headers['origin']
  if (origin) {
    // 跨域请求会携带 origin 字段
    res.setHeader('Access-Control-Allow-Origin', origin)
    // 是否允许携带cookie 客户端需要设置 withCredentials=true 两者一起设置才生效
    res.setHeader('Access-Control-Allow-Credentials', true)
  }

  // 对于非simple请求 浏览器会先发送OPTIONS请求，询问服务器支持的methods、headers
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET,PATCH,PUT,POST,DELETE,HEAD,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, X-HTTP-Method-Override')
    // OPTIONS请求的生效时间，避免后续的每次请求都发送OPTIONS请求
    res.setHeader('Access-Control-Max-Age', 3600)
    res.status(200).end()
  } else {
    // 处理正常请求
    next()
  }
}

function logger(req, res, next) {
  let log = `url:${req.url} method:${req.method} headers:${JSON.stringify(req.headers)}`
  console.log(log)
  next()
}

app.use(logger)
app.use(customCORS)

app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/simple', function (req, res) {
  res.send('get simple....')
})

app.post('/simple', function (req, res) {
  // res.send('post simple....')
  res.json({name:'bean',age:32})
})

app.listen(port)
