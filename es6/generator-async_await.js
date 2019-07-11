/**
 * Generator 函数的语法  async await 语法
 */
const fs = require('fs');
const path = require('path')

const filePaht1 = path.join(__dirname,'a.txt')
const filePaht2 = path.join(__dirname,'b.txt')

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

const gen = function* () {
  const f1 = yield readFile(filePaht1);
  const f2 = yield readFile(filePaht2);

  console.log('--generator----------------------------')
  console.log(f1.toString());
  console.log(f2.toString());
};

//执行器
function run(fn) {
  let gen = fn()
  function next(err, data){
    if (err) throw err 
    let result = gen.next(data)
    if (result.done) return 
    result.value
    .then(data => next(null,data))
    .catch(err => next(err,null))
  }
  next()
}



run(gen)



const asyncReadFile = async function () {
  const f1 = await readFile(filePaht1);
  const f2 = await readFile(filePaht2);
  console.log('--async await----------------------------')
  console.log(f1.toString());
  console.log(f2.toString());
};

asyncReadFile()



const fetch = require('node-fetch')
const encoding = require("encoding");


async function getTitle(url) {
  let response = await fetch(url)
  let html = await response.buffer() 

  let resultBuffer = encoding.convert(html, 'utf8', 'GB18030');
  html = resultBuffer.toString()
  try{
    return html.match(/<title>([\s\S]+)<\/title>/i)[1]
  }catch(err){
    return html
  }
}

getTitle('http://hq.sinajs.cn/list=sh601006')
  .then(console.log)
  .catch(console.log)


function sleep(interval) {
  return new Promise(resolve => {
    setTimeout(resolve, interval);
  })
}

// 用法
async function one2FiveInAsync() {
  for(let i = 1; i <= 5; i++) {
    console.log(i);
    await sleep(1000);
  }
}

one2FiveInAsync();
