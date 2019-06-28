import _ from 'lodash'
import './style.css'

function component(){
  const ele = document.createElement('div')
  ele.innerHTML = _.join(['hello','webpack'],' ')
  ele.classList.add('hello')
  return ele
}

document.body.appendChild(component())