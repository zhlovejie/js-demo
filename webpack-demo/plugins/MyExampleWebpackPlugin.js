const fs = require('fs')
const path = require('path')

function MyExampleWebpackPlugin(options){
  //获取参数对象
  this.$$options = options
}

MyExampleWebpackPlugin.prototype.apply = function(compiler){
  //生成资源到 output 目录之后触发
  compiler.plugin('afterEmit', (compilation,callback) => {
      //webpack.cofngi.js 里面 output 对象
      const outputOptions = compilation.outputOptions
      //输出目录
      let outPath = outputOptions.path
      //脚本路径
      let publicPath = outputOptions.publicPath || ''
      let options = this.$$options

      //遍历资源，拼接成串
      let scriptStr = ''
      for(let filePathName in compilation.assets){
        scriptStr += `<script src='${path.join(publicPath,filePathName)}'></script>`
      }

      let scriptReg = /<%\s?=\s?scriptSource%>/gi
      let titleReg = /<%\s?=\s?title%>/gi

      let templatePath = options.templatePath || path.join(__dirname,'default.html')
      let templateTitle = options.title || '这家伙很懒，title都没设置...'
      let templateSource = ''
      try{
        //读取模板内容
        templateSource = fs.readFileSync(templatePath).toString()
        //替换模板对应的title
        templateSource = templateSource.replace(titleReg,templateTitle)
        //替换模板对应的脚本
        templateSource = templateSource.replace(scriptReg,scriptStr)
        //生产最终文件到输出目录
        fs.writeFileSync(path.join(outPath,'index.html'),templateSource)
      }catch(err){
        console.log(err)
      }
      callback && callback()
  })
}

module.exports = MyExampleWebpackPlugin