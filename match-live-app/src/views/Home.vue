<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <cube-button :light="true">Light Button</cube-button>
    <cube-button :inline="true">Inline Button</cube-button>
    <cube-button :outline="true">Outline Button</cube-button>
    <cube-button :primary="true">Primary Button</cube-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
};
</script>
