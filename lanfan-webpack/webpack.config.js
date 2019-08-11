const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  mode:'development',//运行模式
  //devtool:'inline-source-map',
  entry:{
    app:'./src/main.js' //入口文件
  },
  output:{
    filename:'bundle.js',//输出文件名称
    path:path.resolve(__dirname,'dist'),//输出目录
    publicPath:'' //输出脚本路径 默认 ''
  },
  plugins:[
    new VueLoaderPlugin()
  ],
  module:{
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 它会应用到普通的 `.js` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude : /node_modules/
      },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  }
}