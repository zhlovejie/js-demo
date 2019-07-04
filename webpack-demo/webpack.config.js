const path = require('path')
//const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MyExampleWebpackPlugin = require('./plugins/MyExampleWebpackPlugin')

module.exports = {
  //配置webpack查找loader的顺序，如果是npm包 则不用配置此项 默认 node_modules 中找
  //先在node_modules找，再到loaders文件夹找
  resolveLoader:{ 
    modules: ['node_modules',path.resolve(__dirname,'loaders')]
  },
  mode:'development',//运行模式
  //devtool:'inline-source-map',
  entry:{
    app:'./src/test.js', //入口文件
    app1:'./src/test.js',
    app2:'./src/test.js'
  },
  output:{
    filename:'[name].[hash].bundle.js',//输出文件名称
    path:path.resolve(__dirname,'dist'),//输出目录
    publicPath:'' //输出脚本路径 默认 ''
  },
  plugins:[
    new CleanWebpackPlugin(),
    new MyExampleWebpackPlugin({
      title:'webpack自定义插件参数 title......',
      templatePath:path.join(path.resolve(__dirname,'template'),'index.html')
    })
  ],
  module:{
    rules:[
      {
        test:/\.txt$/, //匹配检测
        use:[
          //多个loader 执行顺序 从下往上 
          //先执行reverse-loader 再执行 uppercase-loader 
          //最后一个执行的loader 返回的必须是 module 形式的代码
          {
          loader:'uppercase-loader',//自定义loader 转换为大写
          options:{ //自定义参数
            type:'all'
          }
        },{
          loader:'reverse-loader',//自定义loader 翻转文本
          options:{ //自定义参数
            suffix:'3'
          }
        }]
      }
    ]
  }
}