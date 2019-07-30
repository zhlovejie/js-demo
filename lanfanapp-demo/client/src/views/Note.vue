<template>
  <div class="note-page-wrapper">
    <Header class="note-header">笔记</Header>
    <div class="note-main">
      <p class="no-more">暂无笔记</p>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  components:{
    Header
  }
}
</script>

<style lang="scss">
.note-page-wrapper{
  .note-header{
    position: fixed;
    top:0;
    left: 0;
    right: 0;
  }
  .note-main{
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;

    .no-more{
      margin-top: 10%;
      font-size: 15px;
      font-weight: bold;
      color: #888;
      text-align: center;
    }
  }
}
</style>
