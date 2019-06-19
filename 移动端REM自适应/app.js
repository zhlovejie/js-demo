import sass from './sass/test.scss'

init()

function init(){
  flexable()
  initSwaper()
}

function flexable(){
  const d = document,w = window
  function setFontSize(){
    let htmlWidth = d.documentElement.clientWidth || d.body.clientWidth 
    htmlWidth = htmlWidth > 720 ? 720 : htmlWidth
    let htmlDom   = d.getElementsByTagName('html')[0]
    htmlDom.style.fontSize = (htmlWidth / 10) + 'px'
  }
  setFontSize()
  w.addEventListener('resize',setFontSize)
}


function initSwaper(){
  const Swiper = require('swiper').default
  new Swiper('.swiper-container', {
    autoplay: true
  })
}