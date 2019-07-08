<template>
  <cube-scroll
    ref="scroll"
    :data="matchList"
    :options="scrollConfig"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <ul class="match-inner">
      <li v-for="(item, index) in matchList" :key="index" class="match-item">
        <div class="left-team">
          <img :src="item.hostLogoUrl" alt="" class="logo">
          <p class="name">{{item.hostTeamName}}</p>
        </div>
        <div class="center">
          <p v-if="item.live" class="guest" :class="{end : item.isEnd}">{{item.live}}</p>
          <p v-if="item.order" class="order" @click="subscribe">{{item.order}}</p>
          <p class="score" :class="{last: item.isEnd}">
            {{item.hostScore}} - {{item.guestScore}}
          </p>
          <p v-if="!item.isEnd" class="time">{{item.endTime}}</p>

        </div>
        <div class="right-team">
          <img :src="item.guestLogoUrl" alt="" class="logo">
          <p class="name">{{item.guestTeamName}}</p>
        </div>
      </li>
    </ul>
  </cube-scroll>
</template>

<script>
import matchData from '../common/data/match-list.js';

window.matchData = matchData;

export default {
  created() {
    window.cubeUI = this;
    console.log(this.type, this.status);
  },
  props: ['type', 'status'],

  data() {
    return {
      scrollConfig: {
        scrollbar: {
          fade: true,
        },
        pullDownRefresh: {
          threshold: 90,
          stop: 50,
          txt: '刷新成功',
        },
        pullUpLoad: {
          threshold: 100,
          txt: {
            more: '加载更多',
            noMore: '没有更多的比赛啦',
          },
        },
      },
      matchList: this.getMacthData(),
    };
  },
  watch: {
    type() {
      const that = this;
      that.matchList = that.getMacthData();
    },
    matchList() {
      if (this.matchList.length === 0) {
        this.$createToast({
          type: 'warn',
          time: 1000,
          txt: '暂无数据',
        }).show();
      }
    },
  },
  methods: {
    getMacthData() {
      const result = matchData[this.type.toLowerCase()]
        ? matchData[this.type.toLowerCase()][Number(this.status)]
        : [];
      return result;
    },
    subscribe() {
      if (!this.subscribeDialog) {
        this.subscribeDialog = this.$createDialog({
          type: 'alert',
          // title: '我是标题',
          content: '订阅成功',
          // icon: 'cubeic-alert',
          onConfirm() { console.log('confirm called...'); },
          onCancel() { console.log('cancel called...'); },
          onClose() { console.log('close called...'); },
        });
      }
      this.subscribeDialog.show();
    },
    onPullingDown() {
      this.loadMatch('down');
    },
    loadMatch(type) {
      setTimeout(() => { // 这里用setTimeout模拟数据请求,真实情况下你需要向接口请求数据
        if (Math.random() > 0.5) {
          const match = [];
          for (let index = 5; index > 0; index--) {
            match.push(this.matchList[index]);
          }
          if (type === 'down') {
            this.matchList.unshift(...match);
          } else if (type === 'up') {
            this.matchList = this.matchList.concat(match);
          }
        } else {
          this.$refs.scroll.forceUpdate();
          if (type === 'up') { // 上拉加载时，无更多数据的提示文案显示之后，让列表回到原位
            setTimeout(() => {
              this.$refs.scroll.scroll.scrollBy(0, 64, 800);
            }, 1000);
          }
        }
      }, 1000);
    },
    onPullingUp() {
      this.loadMatch('up');
    },
  },
};
</script>

<style>
.match-inner{color: #000;font-size: 14px;}
.match-inner .match-item{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
}
.match-item .left-team,.match-item .right-team,.match-item .center{flex: auto;}
.match-item .left-team,.match-item .right-team{
  width: 30%;
  line-height: 1.8;
}
.match-item .center{
  width: 40%;
  line-height: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.match-item .time{color:#aaa;font-size: 13px;}
.match-inner .match-item .logo{width: 40px;height: auto;}

.match-item .guest,.match-item .order{
  height: 25px;
  line-height: 25px;
  padding: 0 10px;
  border-radius: 25px;
  border:1px solid transparent;
  background-color: green;
  color: #fff;
  font-size: 13px;
}
.match-item .order{
  background-color: #fff;
  border:1px solid green;
  color: green;
}
</style>
