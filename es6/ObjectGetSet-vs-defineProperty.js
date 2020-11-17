"use strict";
/**字面量 Object get set 和 Object.defineProperty 的区别 */

/**字面量 Object get set 适合一次性初始化，后期不好修改 */
let user = {
  name:'Bean',
  _age:0,
  get age(){
    return this._age
  },
  set age(val){
    if(val > 100 || val <= 0 ){
      throw new Error('age must between 0 ~ 100')
    }
    this._age = val
  }
}

try{
  user.age = 200
}catch(e){
  console.error(e.message)
}
console.log(user.age)


/**Object.defineProperty 可以新增、修改已有的属性。通过 Object.getOwnPropertyDescriptor 查看属性的配置情况*/
let obj = {name:'Bean',$age:30}
let propertyDescriptor = Object.getOwnPropertyDescriptor(obj,'name')
console.log(propertyDescriptor)
if(propertyDescriptor.configurable){
  Object.defineProperty(obj,'name',{
    //configurable:true, //是否可配置
    //enumerable:true,   //是否可便利
    //writable:true,     //是否可写入    writable,value 和 get、set 互斥 只可定义其中一个
    //value:0,
    get(){
      return obj.$age
    },
    set(val){
      if(val > 100 || val <= 0 ){
        throw new Error('age must between 0 ~ 100')
      }
      obj.$age = val
    }
  })
}
propertyDescriptor = Object.getOwnPropertyDescriptor(obj,'name')
console.log(propertyDescriptor)


