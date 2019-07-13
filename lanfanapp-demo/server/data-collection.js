const fileApi = require('./file')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

function run(url){
  return JSDOM.fromURL(url, {runScripts: "dangerously"})
  .then((dom) => {
    const __NUXT__ = dom.window['__NUXT__']
    const __recipe = __NUXT__.data[0].recipe

    const collectInfo = {
      n_collects:__recipe.n_collects,
      producer_id:__recipe.producer_id
    }

    const indexJson = fileApi.readJSON(fileApi.files.index)
    indexJson.recipeList.push(__recipe)
    fileApi.writeJSON(fileApi.files.index,JSON.stringify(indexJson))

    // const collectJson = fileApi.readJSON(fileApi.files.collects)
    // collectJson.collects.push(collectInfo)
    // fileApi.writeJSON(fileApi.files.collects,JSON.stringify(collectJson))

    console.log(`${__recipe.id} --${__recipe.name}`)
  })
  .catch((err)=>{
    //console.log(err)
  });
}

async function init(){
  //let baseUrl = 'http://lanfanapp.com/recipe/101/'
  for(let i = 3000;i<4000;i++){
    await run(`http://lanfanapp.com/recipe/${i}/`)
  }
  console.log('over...')
}


//init()
//console.log(typeof readJSON(files.index))

//console.log(result.match(/<title>([\s\S]*)<\/title>/)[0])
//fileApi.testCreate('../test123')

//fileApi.writeJSON('../test123/test.txt','hello node...')
