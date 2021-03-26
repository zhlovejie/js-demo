const http = require('http');
const https = require('https')
const fs = require('fs')
const path = require('path')

const options = {
  key: fs.readFileSync(path.resolve(__dirname, '../openssl', 'server.key')),
  cert: fs.readFileSync(path.resolve(__dirname, '../openssl', 'server.crt'))
}

function accept(req, res) {
  if (req.url === '/favicon.ico') {
    res.end()
    return
  }
  const origin = req.headers['origin']
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Credentials', true)
  }

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Access-Token')
    res.end()
    return
  }

  if (req.url == '/') {
    res.setHeader('Content-Type', 'text/plain')
    res.end('home page')
  } else if (req.url == '/simple' && req.method == 'POST') {
    res.setHeader('Content-Type', 'text/plain')
    // 暴露给客户端的响应头，设置后 客户端通过 getAllResponseHeaders 可以取到数据
    res.setHeader('Access-Control-Expose-Headers', 'X-custom-id,X-custom-name')
    res.setHeader('X-custom-id', '111')
    res.setHeader('X-custom-name', '222')
    res.setHeader('X-custom-age', '333') // 未设置，客户端取不到
    res.end('/simple - POST')
  } else if (req.url == '/simple' && req.method == 'GET') {
    // 服务器开启的https后，设置cookie才生效，添加SameSite设置，防止安全问题
    res.setHeader('Set-Cookie', ['abc=123;SameSite=None; Secure', '__name=__bean;SameSite=None; Secure'])
    res.setHeader('Content-Type', 'application/json')
    let result = {
      name: 'bean', age: 32, from: '/simple - GET'
    }
    res.end(JSON.stringify(result))
  } else {
    res.end(`unknow:${req.url} method:${req.method}`)
  }
  return
}

http.createServer(accept).listen(3000, function () {
  console.log('http Server listening at port 3000')
})

https.createServer(options, accept).listen(8080, function () {
  console.log('https Server listening at port 8080')
})

