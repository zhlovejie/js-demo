<template>
  <div class="wrapper">
    <p class="abc">{{msg}}</p>
    <p v-for="(val,index) in display()" :key="index" >
      {{index + 1}}.{{val}}
    </p>
  </div>
</template>

<script>
import "@babel/polyfill";

import regeneratorRuntime from 'regenerator-runtime'

let delay = (ms) =>{
  return new Promise((resolve,reject) =>{
    setTimeout(() =>{
      resolve(123)
    },ms)
  })
}

async function test123(){
  let r1 = await delay(2000)
  console.log(r1)
  let r2 = await delay(2000)
  console.log(r2)
  let r3 = await delay(2000)
  console.log(r3)
  let r4 = await delay(2000)
  console.log(r4)
  return r1 + r2 + r3 + r4
}

test123().then((result) =>{
  alert(result)
})


export default {
  data(){
    return {
      msg:'hello vue....'
    }
  },
  methods:{
    display(){
      return [1, 2, 3, 4, 5, 6, 7, 8].map(val =>val * 2)
    }
  }
}
</script>

<style>
  .abc{color: red;}
</style>
