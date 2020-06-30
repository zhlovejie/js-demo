const path = require('path')
const fs = require('fs')
const config = require('../config')
const Busboy = require('busboy')
const {
  __G_FILE_CACHE__
} = require('../app')
const {
  resolve
} = require('path')

/**
 * 同步创建文件目录
 * @param {string} dirname 目录绝对地址
 */
function mkdirSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true
  }
  if (mkdirSync(path.dirname(dirname))) {
    fs.mkdirSync(dirname)
    return true
  }
}

/**
 * 文件的后缀名
 * @param {string} fileName 
 */
function getSuffixName(fileName) {
  if (typeof fileName !== 'string') return ''
  return path.extname(fileName) || ''
}

function uploadBigFile(ctx, options) {
  let {
    req
  } = ctx
  let busboy = new Busboy({
    headers: req.headers
  })
  let fileType = options.fileType || 'common'
  let filePath = path.join(options.path, fileType)
  mkdirSync(filePath)

  return new Promise((resolve, reject) => {
    let result = {
      files: {},
      formData: {}
    }
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      let newFileName = uuid()
      let saveTo = path.join(filePath, newFileName)
      file.pipe(fs.createWriteStream(saveTo))
      file.on('end', () => {
        try {
          result.files[fieldname] = {
            originalName: filename,
            fileName: newFileName,
            filePath: saveTo
          }
        } catch (err) {
          console.log(err)
        }
      })
    })

    busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
      result.formData[fieldname] = val;
    })

    busboy.on('finish', () => {
      try {
        let sourcePath = result.files.chunk.filePath
        let {
          hash,
          hashIdx
        } = result.formData
        let fileSingleDir = path.join(filePath, hash)
        mkdirSync(fileSingleDir)
        let targetPath = path.join(fileSingleDir, hashIdx)
        fs.renameSync(sourcePath, targetPath)
        resolve({
          code: 200,
          msg: '操作成功'
        })
      } catch (err) {
        console.log(err)
      }
    })

    busboy.on('error', (err) => {
      console.log(err)
      reject({
        code: 500,
        msg: err.message
      })
    })
    req.pipe(busboy)
  })
}

function margeAction({
  hash,
  fileName
}) {
  //文件上传目录
  const uploadDir = path.join(config.upload_dir, 'common')
  //大文件目录
  const targetDir = path.join(uploadDir, hash)
  //最后生成的文件
  const targetTmpFileName = path.join(uploadDir, `tmp_${hash}`)
  const targetFileName = path.join(uploadDir, `${hash}`)

  if (!fs.existsSync(targetDir)) {
    return {
      code: 500,
      msg: '未找到指定文件'
    }
  }
  process.nextTick(() => {
    if (fs.existsSync(targetTmpFileName)) {
      fs.unlinkSync(targetTmpFileName)
    }
    for (let f of fs.readdirSync(targetDir)) {
      let fpath = path.join(targetDir, f)
      fs.appendFileSync(targetTmpFileName, fs.readFileSync(fpath)) //追加到目标文件
      fs.unlinkSync(fpath) //删除小文件
    }
    /**
     * 存在执行目录清空后,目录已经清空,还是能读出文件,导致 rmdirSync 接口报错
     * 大文件尤其明显
     * 此处特殊处理下
     */
    new Promise((resolve, reject) => {
      let s = Date.now()
      let handler = setInterval(() => {
        if (Date.now() - s >= 1000 * 3) {
          clearInterval(handler)
          reject('timeout')
          return
        }
        if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length === 0) {
          clearInterval(handler)
          fs.rmdirSync(targetDir)
          resolve()
          return
        }
      }, 100)
    }).then(() => {
      try {
        fs.renameSync(targetTmpFileName, targetFileName)
        cacheUpdate(hash, targetFileName)
      } catch (err) {
        console.log(`执行重命名操作出错：参数p1:${targetTmpFileName} p2:${targetFileName}`)
      }
    }).catch((err) => {
      console.log(err)
    })
  });
  cacheAdd(hash, {fileName: fileName})
  return {
    code: 200,
    msg: '操作成功'
  }
}

/**
 * 
 * @param {*} param0 
 */
function checkHashAction({
  hash
}) {
  //最后生成的文件
  let targetFileName = path.join(config.upload_dir, 'common', `${hash}`)
  return {
    code: 200,
    msg: '',
    data: {
      status: (!!cacheGet(hash) || fs.existsSync(targetFileName)) ? 1 : 0
    }
  }
}

function fileListAction() {
  let result = {
    code: 200,
    msg: '操作成功',
    data: []
  }
  for (let [k, v] of global.__G_FILE_CACHE__.entries()) {
    result.data.push({
      hash: k,
      file: v
    })
  }
  return result
}

function fileDelAction(hash) {
  const uploadDir = path.join(config.upload_dir, 'common')
  const targetFileName = path.join(uploadDir, `${hash}`)
  try {
    let stat = fs.statSync(targetFileName)
    if (stat.isFile()) {
      fs.unlinkSync(targetFileName)
      cacheDel(hash)
      return {
        code: 200,
        msg: '操作成功'
      }
    } else {
      return {
        code: 500,
        msg: '非文件'
      }
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      return {
        code: 500,
        msg: '文件不存在'
      }
    }
    return {
      code: 500,
      msg: `code:${err.code} ${err.message}`
    }
  }
}

function uuid() {
  let _uuid = () => Math.random().toString(32).slice(-8)
  let _str = `${_uuid()}${_uuid()}${_uuid()}`
  return _str.replace(/[\.]/g, '')
}

function cacheAdd(k, v) {
  global.__G_FILE_CACHE__.set(k, v)
}

function cacheGet(k) {
  return global.__G_FILE_CACHE__.get(k) || null
}

function cacheHas(k) {
  return global.__G_FILE_CACHE__.has(k)
}

function cacheDel(k){
  return global.__G_FILE_CACHE__.delete(k)
}

function cacheUpdate(hash, fpath) {
  if (cacheHas(hash)) {
    let v = cacheGet(hash)
    try {
      let stat = fs.statSync(fpath)
      if (stat.isFile()) {
        let _v = Object.assign({}, v)
        _v.size = stat.size
        _v.ctime = stat.ctime
        cacheAdd(hash, _v)
      }
    } catch (err) {
      console.log(`code:${err.code} ${err.message}`)
    }
  }
}



module.exports = {
  uploadAction: uploadBigFile,
  margeAction,
  checkHashAction,
  fileListAction,
  fileDelAction
}