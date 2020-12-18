const imgWrapper = document.querySelector('.img-wrapper')
const optionWrapper = document.querySelector('.option-wrapper')

function doAction(type) {
  let action = {
    'load': fetchImg,
    'shuffle': shuffleImgs,
    'reset': renderImgs
  }
  action[type] && action[type]()
}

function renderImgs(cb) {
  let html = '',
    count = 15
  for (let i = 1; i <= count; i++) {
    html += `<img class="img-item" src="./img/${i}.jpg" alt="鞋子~">`
  }
  imgWrapper && (imgWrapper.innerHTML = html)
  cb && cb()
}

function getPosition(imgList) {
  return imgList.map(ele => {
    let {
      left,
      top
    } = ele.getBoundingClientRect()
    return {
      left,
      top
    }
  })
}
/**
 * 乱序实现
 */
function shuffleImgs() {
  let imgList = Array.prototype.slice.call(document.querySelectorAll('.img-item'))
  //获取当前图片列表的位置
  let prevPos = getPosition(imgList)
  //打乱顺序
  let newImgList = shuffle(imgList)
  imgWrapper.innerHTML = ''
  newImgList.map(ele => imgWrapper.appendChild(ele))
  //获取对应图片的最新位置，，需要注意获取位置都是从imgList获取的而不是 newImgList
  let currentPos = getPosition(imgList)
  //执行动画
  animate(newImgList, prevPos, currentPos)
}

function animate(eles, prevPos, currentPos) {
  eles.map((ele, idx) => {
    const invert = {
      left: currentPos[idx].left - prevPos[idx].left,
      top: currentPos[idx].top - prevPos[idx].top,
    }
    const keyframes = [{
        transform: `translate(${invert.left}px, ${invert.top}px)`
      }, // 初始位置是倒置后的位置
      {
        transform: "translate(0)"
      }, // 图片更新后本来应该在的位置
    ]
    const options = {
      duration: 1000,
      easing: "cubic-bezier(0,0,0.32,1)"
    }
    const animation = ele.animate(keyframes, options)
  })
}

function fetchImg() {
  let makeIdx = () => Math.floor(1 + Math.random() * 20)
  let imgQueue = [makeIdx(), makeIdx(), makeIdx(), makeIdx(),makeIdx()].map(idx => {
    return new Promise((resolve, reject) => {
      let img = new Image()
      img.classList.add('img-item')
      img.src = `./img/${idx}.jpg`
      img.onload = () => resolve(img)
      img.onerror = () => resolve(null)
    })
  })

  //获取图片位置
  let imgList = Array.prototype.slice.call(document.querySelectorAll('.img-item'))
  let prevPos = getPosition(imgList)

  Promise.all(imgQueue)
    .then(res => {
      //加载新图片，放进容器，此时 imgList 元素的位置因为新图片的加入，位置发生变化
      res.filter(ele => ele !== null).map(ele => imgWrapper.prepend(ele))
    })
    .then(() => {
      //获取 imgList 元素的 最新位置
      let currentPos = getPosition(imgList)
      //执行动画
      animate(imgList, currentPos, prevPos)
    })
}
/**
 * 简单的洗牌算法
 * @param {Array} arr 
 */
function shuffle(arr) {
  let _arr = [...arr]
  let _len = _arr.length
  let _count = _len
  let _idx = () => Math.floor(Math.random() * _len)
  while (_count >= 0) {
    let _idx1 = _idx(),
      _idx2 = _idx()
    if (_idx1 !== _idx2) {
      let _tmp = _arr[_idx1]
      _arr[_idx1] = _arr[_idx2]
      _arr[_idx2] = _tmp
      _count--
    }
  }
  return _arr
}

/**
 * 简单的吸顶效果实现
 */
function initHeaderFixed() {
  window.addEventListener('scroll', function () {
    let top = document.documentElement.scrollTop
    if (top > 0) {
      if (!optionWrapper.classList.contains('option-wrapper-fix')) {
        optionWrapper.classList.add('option-wrapper-fix')
      }
    } else {
      optionWrapper.classList.remove('option-wrapper-fix')
    }
  })
}

function init() {
  initHeaderFixed()
  renderImgs()
}

init()