<template>
  <div id="app">
    <transition name="slide-left" mode="out-in" appear>
      <router-view class="app-wrapper"></router-view>
    </transition>
  </div>
</template>

<style>
  *{box-sizing: border-box;}
  .app-wrapper{
    transition: all .3s cubic-bezier(.55,0,.1,1);
  }
  
</style>
