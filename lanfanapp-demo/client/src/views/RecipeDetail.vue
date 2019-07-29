<template>
  <div class="recipe-detail-container">
    <i class="btn-close cubeic-close" @click="closeHandler"></i>
  <article class="container" v-if="recipeList.length > 0">
    <div id="recipe-media-container" class="recipe-media-container" >
        <video 
            id="recipe-media" 
            :poster="formatImgURL(recipe.square_image)" 
            :src="recipe.square_video" 
            width="720" 
            height="720" 
            controls="controls" playsinline class="recipe-media" style="width: 100%;height:auto;" >
        </video>
    </div>
    <h1 class="recipe-name title-1" >{{recipe.name}} {{recipe.name_adj}}</h1>
    <section class="recipe-meta" >
        <div class="recipe-meta-item time" >
            <div class="meta-name" >时间</div>
            <div class="meta-value" >{{recipe.time_consuming}}</div>
        </div>
        <div class="recipe-meta-item difficulty" >
            <div class="meta-name" >难度</div>
            <div class="meta-value" >
                {{recipe.difficulty_text}}
            </div>
        </div>
        <div class="recipe-meta-item score" v-if="recipe.score > 1">
            <div class="meta-name" >评分</div>
            <div class="meta-value" >
                {{recipe.score | formatScore}}
                <span class="score-icons" v-for="(star,index) in calcScore(recipe.score)" :key="index">
                    <img  src="http://192.168.1.103:3000/public/image/star-selected-unable.png" width="16" height="16" >
                </span>
            </div>
        </div>
    </section>
    <hr class="divider" >
    <section class="recipe-ings" >
        <h3 class="title-2" >用料<span class="recipe-serving" v-if="recipe.serving.length > 0">{{recipe.serving}}</span></h3>
        <div class="ing-group" v-for="(item,index) in recipe.ing_groups" :key="index">
            <div class="ing-group-name" v-if="item.name.length > 0">{{item.name}}</div>
            <div class="ing-group-ings" >
                <div class="ing" v-for="(ing,index1) in item.ings" :key="index1">
                    <div class="ing-name" >{{ing.name}}</div>
                    <div class="ing-unit" >{{ing.amount}}</div>
                </div>
            </div>
        </div>
    </section>
    <section class="steps" >
        <div class="step" v-for="(step,index) in recipe.steps" :key="index">
            <h4 class="title-2" >制作步骤 {{index + 1}}</h4>
            <div class="step-text" >{{step.text}}</div>
        </div>
    </section>
    <section class="tips" v-if="recipe.tips.length > 0">
        <h3 class="title-2" >诀窍点</h3>
        <p class="tips-content" >{{recipe.tips}}</p>
    </section>
  </article>
  </div>
</template>

<script>
export default {
  data:function(){
    return {
      recipeList:[],
      recipe:{},
      toast:null
    }
  },
  
  created:function(){
    if(!this.toast){
      this.toast = this.$createToast()
    }
    this.toast.show()
    let id = this.$route.params.id
    let that = this
    this.$http(`getRecipe/${id}`).then(result =>{
      that.recipeList = [result.data]
      that.recipe = result.data
      that.toast.hide()
    }).catch(err => {
      console.log(err.message)
      that.toast.hide()
    })
  },
  methods:{
    closeHandler:function(){
      this.$router.go(-1)
    },
    formatImgURL(url){
      console.log(url)
      return this.$tools.formatImageUrl(url)
    },
    formatVideoURL(url){
      return this.$tools.formatVideoUrl(url)
    },
    calcScore:function(val){
      let _v = parseFloat(val)
      _v = isNaN(_v) ? 0 : _v.toFixed(1)
      let result = Math.ceil(_v) / 2
      let arr = []
      for(let i = 1 ;i<result;i++){
        arr.push(i)
      }
      return arr
    }
  },
  filters:{
    formatScore:function (val){
      let _v = parseFloat(val)
      return isNaN(_v) ? 0 : _v.toFixed(1)
    }
  }
}
</script>

<style scoped>
img,video {
  -webkit-touch-callout: none
}

.btn-close{
  font-weight: bold;
  padding: 5px;
  color: #fff;
  font-size: 22px;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 999999;
}

.container {
  max-width: 640px;
  margin: auto;
  font-size: 17px;
  padding-bottom: 25px
}

.title-1,.title-2 {
  font-weight: 700
}

.title-1 {
  font-size: 24px
}

.title-2 {
  font-size: 20px
}

.title-2 .recipe-serving{
  margin-left: 1rem;
  font-size: 14px;
  font-weight: normal;
}

.recipe-media-container,.step-media-container {
  width: 100%;
  height: 0;
  padding-top: 100%;
  position: relative;
  overflow: hidden;
  background: #eee
}

.recipe-media,.recipe-media video,.step-media,.step-media video {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  -o-object-fit: cover;
  object-fit: cover
}

.recipe-cover {
  display: block;
  width: 100%;
  height: 0;
  padding-top: 100%;
  background-size: cover;
  overflow: hidden;
  position: relative
}

.recipe-cover img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0)
}

.recipe-name {
  margin: 20px 25px
}

.recipe-meta {
  margin: 20px 25px;
  line-height: 1.8
}

.recipe-meta h3 {
  font-size: 20px;
  font-weight: 700
}

.recipe-meta .recipe-meta-item {
  background-position: 0;
  background-repeat: no-repeat;
  background-size: 21px 16px;
  font-size: 15px;
  padding: 10px 0 10px 35px
}

.recipe-meta .recipe-meta-item .meta-name,.recipe-meta .recipe-meta-item .meta-value {
  display: inline-block
}

.recipe-meta .recipe-meta-item .meta-name {
  font-weight: 700;
  margin-right: 10px
}

.recipe-meta .time {
  background-image: url(http://192.168.1.103:3000/public/image/time.png);
  margin-top: -10px
}

.recipe-meta .difficulty {
  background-image: url(http://192.168.1.103:3000/public/image/difficulty.png)
}

.recipe-meta .score {
  background-image: url(http://192.168.1.103:3000/public/image/time.png);
  margin-bottom: -10px
}

/* .recipe-meta .score .score-icons {} */

.recipe-meta .score img {
  position: relative;
  top: 2px;
  margin-right: 4px
}

.divider {
  border: none;
  border-bottom: 1px solid #eef0e9;
  width: auto;
  height: 0;
  margin: 0 25px
}

.recipe-ings {
  margin: 20px 15px
}

.recipe-ings .title-2 {
  margin: 0 10px 20px
}

.recipe-ings .ing-group-name {
  background: #f5f7f0;
  padding: 10px;
  border-radius: 8px
}

.recipe-ings .ing {
  margin: 0 10px;
  padding: 18px 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: box;
  display: flex;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAMAAADQK89MAAADAFBMVEX+/v719/A4ODfm3crb1sfp383j2cfZ2NDu8Om3t7eDg4PU0cbd08HUz7zbz7qoqajYy7Xu5cp3d3Xl17zRy7fq3cLe3dDy0oWwm3rRw6eoemj01pDErorWx67NvJ/s7N/Is4/12pn23qK6o37r36Hs5NOugG/AqYTx2s3u08Xn3ZRnZl3vz47j5NxTU1HcolPk2oc/CQjjxLfoy76+j4G2h3jYzmtYKQ3c0oPMnpLMuZbf1HXyyn4HBwLXzXnTpZjqx4bq3Hn0687gvK58TCCvoYPVmka7spXu4YfHtZnEmIsrBgXRyGPu4K21s3DBup1yPxeVjQnkuoHIwaXIw1bNvoihcz3dtaahdWK2qIu4tDPFhyaiiGCimwxkOhLfql/BuVOrfkLM1oLNx6/e5p6hj3LOxnG7kUvQkDj45qrps2KSYiXqxHnGwGSefFDz5Zfnum6pkm3j0a+JVSDJtnzy0XOMYDTN1JXdy5/HyoKykluYaDjMo1ze05JLHAiztFzW3pitqCvW3KW/v3NzjmW7nlz82Hu8tEThzlujmCTm1mqurGaAWirFmFNTChKujEvCvkOHfAW6umff5q58ZAXfrnHDkjjhnUSgbCuAnXHWx1bDp2m+fg3UxZOsqhTT3I3yyV/Mr3G1hjuPrIH60WnPv0c/ZhToqVHdlDVoLQ3Wu3xuRijswI+qeTBLcxjxv2/XiiW0bwhnDhjcwI28un+MflfG0XCopFjc6Im2g0/36re5m2ypallQSkCmnjkyWA1pVAa9ryD5892Oa0jt0ZtpJyvq7L7LuTB9FCWBMjTo8K7TsmPm8J3U4nOurEc3Kw3Wr59OSg+7mg3JfnbIaAVXfCmARAqUGi7834plii/bqZ/dxkdiZB95mj23WAXRew/kpYUiRwigWE9nXEbvvE6XjD11di/PkIaPfi6flk4TLwWBTj7DpT6Ph2pbhBWWSjy5cmiphAfNgVucaQlxmCKaM0XgsjWIrUXDbkTVohXVlmyfTgatHzfN3lW6RVXPJkQB/o/qAAAACXBIWXMAAAsSAAALEgHS3X78AAAADUlEQVQImWNgYmKAAgAAMQAFgRXvZgAAAABJRU5ErkJggg==);
  background-position: 0 100%;
  background-repeat: repeat-x
}

.recipe-ings .ing:last-child {
  background-image: none
}

.recipe-ings .ing .ing-name {
  -webkit-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -ms-flex: 1;
  flex: 1
}

.steps {
  margin: 45px 0 0;
  line-height: 1.8
}

.steps .step {
  margin-bottom: 50px
}

.steps .step:last-child {
  margin-bottom: 0
}

.steps .step .title-2 {
  margin: 0 25px 25px
}

.steps .step .step-video,.steps .step .step-video video {
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover
}

.steps .step .step-text,.steps .step .step-tips {
  margin-left: 25px;
  margin-right: 25px
}

.steps .step .step-tips {
  background: #f5f7f0;
  border-radius: 4px;
  padding: 15px 20px;
  margin-top: 15px
}

.tips {
  margin: 50px 25px 0;
  background: #f5f7f0;
  line-height: 1.8;
  padding: 15px 20px;
  border-radius: 4px;
  white-space: pre-wrap;
  word-wrap: break-word
}

.tips h3 {
  font-weight: 700;
  margin-bottom: 10px
}

.recipes-recommend {
  margin: 25px 25px -40px
}

.recipes-recommend .title-1 {
  margin: 0 0 20px
}

.recipes-recommend .recipe-recommend {
  width: 50%;
  display: inline-block;
  margin-bottom: 40px
}

.recipes-recommend .recipe-recommend:nth-child(odd) {
  padding-left: 5px
}

.recipes-recommend .recipe-recommend:nth-child(2n) {
  padding-right: 5px
}

.recipes-recommend .recipe-recommend .recipe-recommend-cover {
  display: block;
  width: 100%;
  height: 0;
  padding-top: 100%;
  background-color: #eee;
  background-size: cover;
  overflow: hidden;
  position: relative;
  border-radius: 15px
}

.recipes-recommend .recipe-recommend .recipe-recommend-cover img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0)
}

.recipes-recommend .recipe-recommend .recipe-recommend-title {
  display: block;
  font-size: 17px;
  font-weight: 700;
  padding-top: 10px;
  color: #000;
  text-decoration: none;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  height: 64px
}


</style>
