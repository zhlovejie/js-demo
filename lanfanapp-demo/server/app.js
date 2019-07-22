const path = require('path')
const recipe = require('./models/m_recipe')
const express = require('express')
const app = express()

app.set('port', process.env.PORT || 3000)
//设置静态文件
app.use('/public',express.static(path.join(__dirname,'public')))

app.all('*',(req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  next()
})


app.get('/getRecipe',(req, res, next) => {
  let tagName = req.query.tagName
  console.log(tagName)
  recipe.getRecipeFromTag(tagName)
  .then(result =>res.send(result))
  .catch(err =>next(err))
})

app.get('/allRecipeCategory',(req, res, next) => {
  recipe.allRecipeCategory()
  .then(result =>res.send(result))
  .catch(err =>next(err))
})

app.get('/getRecipeTop',(req, res, next) => {
  recipe.getRecipeTop()
  .then(result =>res.send(result))
  .catch(err =>next(err))
})

app.get('/getRecipeWeekTop',(req, res, next) => {
  recipe.getRecipeWeekTop()
  .then(result =>res.send(result))
  .catch(err =>next(err))
})

app.get('/getAllRecipe/:page',(req, res, next) => {
  let currentPage = req.params.page
  currentPage = Number(currentPage)
  if(isNaN(currentPage) || currentPage < 1){
    currentPage = 1
  }
  if(currentPage > 10){
    res.send([])
  }
  recipe.getAllRecipe(currentPage)
  .then(result =>res.send(result))
  .catch(err =>next(err))
})

app.get('/search/:kw/:page',(req, res, next) => {
  let kw = req.params.kw || ''
  if(kw.length === 0){
    res.send([])
  }
  let currentPage = req.params.page || 1
  currentPage = Number(currentPage)
  if(isNaN(currentPage) || currentPage < 1){
    currentPage = 1
  }
  if(currentPage > 10){
    res.send([])
  }
  
  recipe.searchRecipe(kw,currentPage)
  .then(result =>res.send(result))
  .catch(err =>next(err))
})

app.use((req, res, next) =>{
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.listen(app.get('port'),() =>{
  console.log(`服务运行在端口 ${app.get('port')}`)
})





