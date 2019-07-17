/**
 * 采集 菜谱和评论数据 持久化到 MongoDB
 */
const JSDOM = require('jsdom').JSDOM
const db = require('./db')

function runRecipe(url){
  return JSDOM.fromURL(url, {runScripts: "dangerously"})
  .then((dom) => {
    const __NUXT__ = dom.window['__NUXT__']
    const __recipe = __NUXT__.data[0].recipe
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
      console.log(`${recipe.id} --${recipe.name}`)
      await dbInstance.collection('recipe').insertOne(recipe)
    }
  }
  console.log('菜谱采集完毕...')
}

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