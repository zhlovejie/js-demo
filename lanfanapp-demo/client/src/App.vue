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
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }
</style>
