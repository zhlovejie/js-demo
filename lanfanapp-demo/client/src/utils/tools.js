let w = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
let h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)

function formatImageUrl(urlStr){
  if(!urlStr) return ''
  let baseURL = urlStr.split(/[?@]/g)[0].toString()
  let urlArr = baseURL.split(/\//g)
  let fileName = urlArr[urlArr.length - 1]
  return `http://192.168.1.101:3000/public/image/${fileName.split('.')[0]}.jpg`
}

function formatVideoUrl(urlStr){
  if(!urlStr) return ''
  let baseURL = urlStr.split(/[?@]/g)[0].toString()
  let urlArr = baseURL.split(/\//g)
  return `http://192.168.1.101:3000/public/video/${urlArr[urlArr.length - 1]}`
}

export {
  w as pageWidth,
  h as pageHeight,
  formatImageUrl,
  formatVideoUrl
}
