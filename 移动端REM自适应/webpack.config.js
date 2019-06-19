const path = require('path')

module.exports = {
  mode:'development',
  entry:'./app.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'bundle.js'
  },
  module:{
    rules:[
      {
        test:/\.(sass|scss)$/,
        use:['style-loader','css-loader','sass-loader']
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  }
}