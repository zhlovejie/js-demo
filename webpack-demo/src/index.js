import _ from 'lodash'
import printMe from './print'

function component(){
  const ele = document.createElement('div')
  ele.innerHTML = _.join(['hello','webpack'],' ')
  
  const btn = document.createElement('button')
  btn.innerHTML = 'click me see console....'
  btn.onclick = printMe

  ele.appendChild(btn)

  return ele
}

document.body.appendChild(component())