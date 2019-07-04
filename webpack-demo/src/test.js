import txt from './file.txt' //会触发对应的loader

function component(){
  const divEle = document.createElement('div')

  //这里的txt值为 uppercase-loader.js 动态执行返回值
  divEle.innerText = txt
  document.body.appendChild(divEle)
}

component()