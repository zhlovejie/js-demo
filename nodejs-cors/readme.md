# nodejs环境下测试cors 

### 文件说明
- server-express.js express框架的跨域实现
- server-native.js  原生nodejs实现

### 包括 cors 的常用响应头的设置

跨域请求会携带 origin 字段

```
res.setHeader('Access-Control-Allow-Origin', origin)
```

是否允许携带cookie 客户端需要设置 withCredentials=true 两者一起设置才生效

```
res.setHeader('Access-Control-Allow-Credentials', true)
```

对于非simple请求 浏览器会先发送OPTIONS请求，询问服务器支持的methods、headers

```
res.setHeader('Access-Control-Allow-Methods', 'GET,PATCH,PUT,POST,DELETE,HEAD,OPTIONS')
```

```
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, X-HTTP-Method-Override')
```

OPTIONS请求的生效时间，避免后续的每次请求都发送OPTIONS请求

```
res.setHeader('Access-Control-Max-Age', 3600)
```

### 安装证书

先安装 openssl 用来生成证书

执行以下命令：
```
openssl req -new -newkey rsa:2048 -nodes -out server.csr -keyout server.key

openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```

把生成的.crt文件 安装到受信证书里即可

### nodejs https代码实现

```
const options = {
  key: fs.readFileSync(path.resolve(__dirname, 'openssl', 'server.key')),
  cert: fs.readFileSync(path.resolve(__dirname, 'openssl', 'server.crt'))
}

https.createServer(options, accept).listen(8080, function () {
  console.log('https Server listening at port 8080')
})
```
