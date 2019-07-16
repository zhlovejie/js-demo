function delay(ms){
  return new Promise(function(resolve,reject){
    setTimeout(function(){
      resolve(ms)
    },ms)
  })
}

delay(500)
.then(function(){
  console.log(arguments)
  return arguments[0]
})
.then(function(){
  console.log(arguments)
})

// async function init(){
//   for(let i=0;i<10;i++){
//     console.log(i)
//     await delay(1000)
//   }
// }

// init()