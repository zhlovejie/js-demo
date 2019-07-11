// function test(resolve,reject){
//   var timeout = Math.random() * 2
//   console.log('set timeout to:'+timeout+' seconds')
//   setTimeout(function(){
//     if(timeout < 1){
//       console.log('call resolve()...')
//       resolve('200 OK')
//     }else{
//       console.log('call reject()...')
//       reject('timeout in '+timeout+' seconds')
//     }
//   },timeout * 1000)
// }

// new Promise(test).then(function(result){
//   console.log('success '+result)
// }).catch(function(reason){
//   console.log('fail '+reason)
// })



function multiply(input){
  return new Promise(function(resolve,reject){
    console.log('calculating '+input+' * '+input+'...')
    setTimeout(resolve,500,input * input)
  })
}

function add(input){
  return new Promise(function(resolve,reject){
    console.log('calculating '+input+' + '+input+'...')
    throw new Error('catch error....')
    //setTimeout(resolve,500,input + input)
  })
}

var p = new Promise(function(resolve,reject){
  console.log('start new promise...')
  resolve(123)
})

p.then(multiply)
.then(add)
.then(multiply)
.then(add)
.then(function(result){
  console.log('got value:'+result)
})
.catch(function(reason){
  console.log('reason: '+reason)
})