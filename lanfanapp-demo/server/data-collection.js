//const fileApi = require('./file')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const db = require('./db')

function runRecipe(url){
  return JSDOM.fromURL(url, {runScripts: "dangerously"})
  .then((dom) => {
    const __NUXT__ = dom.window['__NUXT__']
    const __recipe = __NUXT__.data[0].recipe
    return __recipe
  })
  .catch((err)=>{
    //console.log(err)
    return null
  });
}

async function initRecipe(){
  db.action.changeCollection('recipe')
  await db()
  for(let i = 0;i<4000;i++){
    let recipe = await runRecipe(`http://lanfanapp.com/recipe/${i}/`)
    if(recipe){
      console.log(`${recipe.id} --${recipe.name}`)
      let item = await db.recipe.findOne({name:recipe.name,id:recipe.id})
      if(!item){
        await db.action.add(recipe)
      }
    }
  }
  console.log('over...')
  process.exit()
}


function runNote(url){
  return JSDOM.fromURL(url, {runScripts: "dangerously"})
  .then((dom) => {
    const __NUXT__ = dom.window['__NUXT__']
    return __NUXT__.data[0]
  })
  .catch((err)=>{
    //console.log(err)
    return null
  });
}

async function initNote(){
  db.action.changeCollection('note')
  await db()

  for(let i = 30000;i<31000;i++){
    let note = await runNote(`http://lanfanapp.com/note/${i}/`)
    if(note){
      console.log(`currentIndex:${i} -- ${note.note.user.id} -- ${note.note.user.name}`)
      await db.action.add(note)
      // let item = await db.recipe.findOne({name:recipe.name,id:recipe.id})
      // if(!item){
      //   await db.recipe.add(recipe)
      // }
    }
  }
  console.log('over...')
  process.exit()
}

initNote()