let test = [1, 2, 3].map((val) =>val * 2)


let delay = (ms) =>{
  return new Promise((resolve,reject) =>{
    setTimeout(resolve(123),ms)
  })
}

delay(200)