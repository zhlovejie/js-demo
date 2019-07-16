//const fileApi = require('./file')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const db = require('./db')

function run(url){
  return JSDOM.fromURL(url, {runScripts: "dangerously"})
  .then((dom) => {
    const __NUXT__ = dom.window['__NUXT__']
    const note = __NUXT__.data[0]
    return note
  })
  .catch((err)=>{
    //console.log(err)
    return null
  });
}

async function init(){
  db.recipe.changeCollection('note')
  await db()
  for(let i = 0;i<100;i++){
    let note = await run(`http://lanfanapp.com/note/${i}/`)
    if(note){
      console.log(`${note.user.id} --${note.user.name}`)
      await db.recipe.add(note)
    }
  }
  console.log('over...')
  process.exit()
}

init()