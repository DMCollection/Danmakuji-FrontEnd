<template>
  <div @click="goBangumiDetail(bangumi)" class="bangumi-card">
    <div class="bc-img-wrap">
      <img class="bc-img" :src="bangumi.thumb"/>
    </div>
    <div class="bangumi-card-info">
      <div><a>{{bangumi.bangumiName.substring(0,28)}}</a></div>
      <div><a>集数:{{bangumi.episodeTotal}}</a></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BangumiCard",
    props:['bangumi'],
    data(){
      return {

      }
    },
    methods:{
      goBangumiDetail(bangumi){
        console.log("go bangumiDetail");
        let routeData = this.$router.resolve({name: 'bangumidetail', params:{bid:bangumi.bangumiId,bangumi:bangumi}});
        console.log("href:",routeData.href);
        window.open(routeData.href, '_blank');
      }
    }
  }
</script>

<style scoped>
  .bangumi-card {
    width: 200px;
    height: 160px;
    display: inline-block;
    margin: 5px 10px;
  }
  .bc-img-wrap {
    width: 200px;
    height: 100px;
  }
  .bc-img {
    width: 200px;
    height: 100px;
    border-radius: 5px;
  }
  .bangumi-card-info {
    display: inline-block;
    width: 200px;
    font-size: 14px;
    color: white;
  }
  .bangumi-card:hover {
    cursor: pointer;
  }
</style>