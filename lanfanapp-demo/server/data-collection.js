/**
 * 采集 菜谱和评论数据 持久化到 MongoDB
 */
const JSDOM = require('jsdom').JSDOM
const db = require('./models/db')
const sequence = require('./models/nextSequence')
const axios = require('axios')
const fs = require('fs')
const path = require('path')

function getFilePath(fileName,type){
  let baseFilePath = path.resolve(__dirname,'./public/'+(type === 'image' ? 'image' : 'vedio'))
  return path.join(baseFilePath,fileName)
}

async function getAllImageUrls(){
  let dbInstance = await db()
  let query = {}
  let options = {
    projection:{"square_image":1,"square_video":1}
  }
  return await dbInstance.collection('recipe').find(query,options).toArray()
}

async function RunDownloadImage(){
  let urls = await getAllImageUrls()
  for(let item of urls){
    //console.log(item)
    
    await axios({
      method: 'get',
      url:item.square_image,
      responseType: 'stream'
    })
    .then(function (response) {
      //console.log(response.headers)
      
      let baseURL = item.square_image.split(/[?@]/g)[0].toString()
      let urlArr = baseURL.split(/\//g)
      let fileName = urlArr[urlArr.length - 1]
      let arrfile = fileName.split('.')
      let baseName = arrfile[0]
      let suffix = arrfile[1]
      if(response.headers['content-type'].includes('jpeg')){
        fileName = `${baseName}.jpg`
      }else if(response.headers['content-type'].includes('png')){
        fileName = `${baseName}.png`
      }
      console.log('download image:'+fileName)
      response.data.pipe(fs.createWriteStream(getFilePath(fileName,'image')))
    })
    .catch(err =>{console.log(err)})

    await axios({
      method: 'get',
      url:item.square_video,
      responseType: 'stream'
    })
    .then(function (response) {
      //console.log(response.headers)
      let baseURL = item.square_video.split(/[?@]/g)[0].toString()
      let urlArr = baseURL.split(/\//g)
      let fileName = urlArr[urlArr.length - 1]
      console.log('download vedio:'+fileName)
      response.data.pipe(fs.createWriteStream(getFilePath(fileName,'vedio')))
    })
    .catch(err =>{console.log(err)})


    //break;
  }
}

RunDownloadImage()



function runRecipe(url){
  return JSDOM.fromURL(url, {runScripts: "dangerously"})
  .then((dom) => {

    let vedioEle = dom.window.document.querySelector('#recipe-media')
    let img = vedioEle.getAttribute('poster')
    let src = vedioEle.getAttribute('src')
    
    const __NUXT__ = dom.window['__NUXT__']
    const __recipe = __NUXT__.data[0].recipe

    delete __recipe.image
    delete __recipe.step_video
    delete __recipe.url

    __recipe.square_image = img
    __recipe.square_video = src
    __recipe.n_collects = Number(__recipe.n_collects)

    return __recipe
  })
  .catch((err)=>{
    return null
  });
}

async function initRecipe(){
  let dbInstance = await db()
  for(let i = 0;i<4000;i++){
    let recipe = await runRecipe(`http://lanfanapp.com/recipe/${i}/`)
    if(recipe){
      recipe.id = await sequence.getNextSequenceValue('recipeID')
      console.log(`${recipe.id} --${recipe.name}`)
      await dbInstance.collection('recipe').insertOne(recipe)
    }
  }
  console.log('菜谱采集完毕...')
}

//initRecipe()

function runNote(url){
  return JSDOM.fromURL(url, {runScripts: "dangerously"})
  .then((dom) => {
    const __NUXT__ = dom.window['__NUXT__']
    return __NUXT__.data[0]
  })
  .catch((err)=>{
    return null
  });
}

async function initNote(){
  let dbInstance = await db()
  for(let i = 0;i<4000;i++){
    let note = await runNote(`http://lanfanapp.com/note/${i}/`)
    if(note){
      console.log(`currentIndex:${i} -- ${note.note.user.id} -- ${note.note.user.name}`)
      await dbInstance.collection('note').insertOne(note)
    }
  }
  console.log('评论采集完毕...')
  process.exit()
}
//采集菜谱
//initRecipe()
//采集评论
//initNote()