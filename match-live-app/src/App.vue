<template>
  <!-- <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div> -->

  <div id="app">
    <div class="header">
      <div class="title" @click="showPicker">
        <span>{{defaultMatch.text}}</span>
        <i class="cubeic-select" :class="{flip: toFlip}" ref="select"></i>
      </div>
      <div class="navigator">
        <ul class="nav-list">
          <li v-for="(item, index) in tabList" :key="index"
            @click="switchTab(index)" :class="{active: currentPage === index}">
            {{ item }}
          </li>
        </ul>
        <div class="triangle-up" :class="{left: currentPage === 0, right: currentPage === 2}"></div>
      </div>
    </div>
    <div class="content">
      <cube-slide
        :data="tabList"
        :initialIndex="currentPage"
        :loop="false"
        :autoPlay="false"
        :threshold="0.1"
        @change="slideChange">
        <cube-slide-item v-for="(item, index) in tabList" :key="index">
          <div class="match-list-wrapper" :style="{height:initHeight}">
            <MatchList :type="defaultMatch.text" :status="currentPage"></MatchList>
          </div>
        </cube-slide-item>
        <div slot="dots"></div>
      </cube-slide>
    </div>
  </div>
</template>

<script>
import MatchList from './components/MatchList.vue';

export default {
  data() {
    return {
      tabList: ['已结束', '直播中', '我的关注'],
      currentPage: 1,
      toFlip: false,
      picker: null,
      matchList: [
        { text: 'NBA', value: 0 },
        { text: 'DOTA', value: 1 },
        { text: 'SOCCER', value: 2 },
      ],
      defaultMatch: { text: 'SOCCER', value: 2 },
      initHeight: `${window.innerHeight - 80}px`,
    };
  },
  methods: {
    switchTab(index) {
      this.currentPage = index;
    },
    showPicker() {
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: 'Picker',
          data: [this.matchList],
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle,
        });
      }
      this.picker.show();
      this.toFlip = true;
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.defaultMatch = { text: selectedText[0], value: selectedVal[0] };
      this.toFlip = false;
    },
    cancelHandle() {
      this.toFlip = false;
    },
    slideChange(index) {
      this.currentPage = index;
    },
  },
  components: {
    MatchList,
  },
};
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header{background-color: #15181d;color: #f5f5f5;}
.header .title{padding-top: 16px;font-size: 17px;}

.cubeic-select{display: inline-block;transition: all 0.2s linear;}
.cubeic-select.flip{transform: rotate(180deg);}


.navigator{position: relative; padding: 16px 0;font-size: 13px;text-align: center;}
.navigator .nav-list{display: flex;justify-content:center;align-items:center;}
.navigator .nav-list li{flex: 1 1 33.333%;}
.navigator .nav-list li.active{font-size: 14px;color: #fff;}
.navigator .triangle-up{
  position: absolute;
  width: 33.333%;
  text-align: center;
  left: 33.333%;
  bottom: 0;
  transition: all 0.2s linear;
}
.navigator .triangle-up:after{
  content:' ';
  display: inline-block;
  vertical-align: bottom;
  height: 0;
  width: 0;
  border:8px solid #fefefe;
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: transparent;
  border-bottom-color: #fff;
}
.navigator .triangle-up.left{left:0;}
.navigator .triangle-up.right{left:66.666%;}

/* #nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
