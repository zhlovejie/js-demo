<template>
  <div id="app">
    <parentComponent></parentComponent>
  </div>
</template>

<script>
import Vue from 'vue'
import parentComponent from './components/bus/parent'

const Event = new Vue();

export default {
  name: 'app',
  components:{
    parentComponent
  },
  provide:{
    Bus:Event
  }
}
</script>

<style scoped>
  #app{
    width: 800px;
    margin:20px auto 0 auto;
  }
</style>
