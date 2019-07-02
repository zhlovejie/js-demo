const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  mode:'development',
  //devtool:'inline-source-map',
  entry:{
    app:'./src/index.js',
    print:'./src/print.js'
  },
  output:{
    filename:'[name].[hash].bundle.js',
    path:path.resolve(__dirname,'dist')
  },
  plugins:[
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns:['./dist','!./dist/test.js']
      //verbose:true,
      //dry:true
    }),
    new HtmlWebpackPlugin({
      template:'./src/test.html',
      title:'Development...',
      filename: 'assets/admin.html'
    })
  ],
  module:{
    rules:[
      
    ]
  }
}