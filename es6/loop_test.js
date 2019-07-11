//for  foreach  for in   for of 分析异同
var arr = [1,2,3,4,5,6]
var obj = {a:1,b:2,c:3,d:4}


//---------------------------------------

// for(let i = 0;i<arr.length;i++){
//   console.log(arr[i])
// }

// var keys = Object.keys(obj)
// for(let i=0;i<keys.length;i++){
//   let key = keys[i]
//   let val = obj[key]
//   console.log('key:'+key +' val:'+val)
// }

//---------------------------------------

// //forEach 针对数组的遍历  返回 undefined
// let resultForEach = arr.forEach(function(val,index,array){
//   //console.log(val,index,array)
// })
// console.log(resultForEach)


// //map 针对数组的遍历 返回 同原数组长度相同的新数组
// let resultMap = arr.map(function(val,index,array){
//   return val * index
// })
// console.log(resultMap)

//$.each(array,function(val,index){})
//$.each(object,function(val,key){})

// _.forEach(array,function(val,index){})
// _.forEach(object,function(val,key){})


//其他一些工具库 如 jQuery,underscore,lodash 也提供了类似  each,forEach,map 等函数
//这些函数比原生的更加强大，数组和对象都可以遍历，核心功能一样，回调参数有所不同，具体分析

//---------------------------------------

// //对象上增加了方法
// obj.display=function(){
//   console.log(this)
// }

// //构造对象
// function Person(){
//   this.name = 'bean'
//   this.age = 32
// }
// //增加原型方法
// Person.prototype.display = function(){
//   var msg = 'hi , i am '+this.name +' ' +this.age+' years old.'
// }

// //增加原型属性
// Person.prototype.aaaa= 1111;

// var p = new Person()

// //对数组增加原型方法
// Array.prototype.display = function(){
//   console.log(this)
// }

// //tmp 是数组索引值
// for(let tmp in arr){
//   console.log(tmp,arr[tmp])
// }
// //tmp 是对象的key值
// for(let tmp in p){
//   console.log(tmp,p[tmp])
// }

//for in 主要是遍历属性用 ，本地的属性和方法和原型上的属性和方法都会被遍历出来

//---------------------------------------

//for of ES6 新增的遍历方式。 任何实现了 iterator 接口的数据都可以被遍历
//实现 Symbol.iterator 方法
//定义next方法 返回值必须是对象且包含 value (Object) , done(Boolean) 的参数


// obj[Symbol.iterator]= function(){
//   var count = 0
//   return {
//     next:function(){
//       return {
//         value:count++,
//         done :false
//       }
//     },
//     return:function(){
//       return {
//         value : -1,
//         done:true
//       }
//     }
//   }
// }

// for(let tmp of obj){
//   console.log(tmp)
//   if(tmp > 100){
//     throw new Error('error.....')
//   }
// }


// for(let val of arr){
//   console.log(val)
//   if(val > 0) break
// }

// const it = arr[Symbol.iterator]()
// let next = it.next()
// while(!next.done){
//   console.log(next.value)
//   next = it.next()
// }

// for(let tmp of Object.keys(obj)){
//   console.log(tmp,obj[tmp])
// }

// for(let tmp of Object.entries(obj)){
//   console.log(tmp)
// }
// for(let item of obj){
//   console.log(item)
// }

obj[Symbol.for("bean")] = 'i am bean....'

var result = JSON.stringify(obj)




console.log(obj[Symbol.for("bean")])

console.log(result)