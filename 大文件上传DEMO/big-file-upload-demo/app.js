const config = require('./config')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const staticDir = require('koa-static')
const logger = require('koa-logger')
const app = new Koa()

global.__G_FILE_CACHE__ = new Map() //全局文件缓存

const {
  uploadAction,
  margeAction,
  checkHashAction,
  fileListAction,
  fileDelAction
} = require('./util/upload')

app.use(logger())
app.use(staticDir(config.static_dir))
app.use(bodyParser())
app.use(async (ctx) => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    ctx.res.writeHead(302, {
      'Location': '/pages/index.html'
    })
  } else if (ctx.url === '/upload' && ctx.method === 'POST') {
    let result = await uploadAction(ctx, {
      path: config.upload_dir
    })
    ctx.res.writeHead(200,{'Content-Type':'application/json'})
    ctx.body = result
  } else if (ctx.url === '/marge' && ctx.method === 'POST') {
    let body = ctx.request.body
    ctx.res.writeHead(200,{'Content-Type':'application/json'})
    ctx.body = margeAction(body)
  } else if (ctx.url === '/checkHash' && ctx.method === 'POST') {
    let body = ctx.request.body
    let result = checkHashAction(body)
    ctx.res.writeHead(200,{'Content-Type':'application/json'})
    ctx.body = result
  } else if (ctx.url === '/fileList' && ctx.method === 'GET'){
    ctx.res.writeHead(200,{'Content-Type':'application/json'})
    ctx.body = fileListAction()
  } else if (ctx.url === '/fileDel' && ctx.method === 'POST'){
    let {hash} = ctx.request.body
    ctx.res.writeHead(200,{'Content-Type':'application/json'})
    ctx.body = fileDelAction(hash)
  }
})

app.listen(3000, () => {
  console.log('server start...')
})