<template>
  <div class="announce">
    <div class="page-container">
      <div class="title-container">
        <h1>{{notice.title}}</h1>
        <div>
          <span ><i class="el-icon-date" title="发布时间" style="padding-right: 5px"></i>{{notice.createTime | formatDate}}</span>
          <span style="margin-left: 15px"><i class="el-icon-view" title="阅读量" style="padding-right: 5px"></i>{{notice.viewCount}}</span>
        </div>
      </div>
      <div class="content-container">
        <div class="ctx-text" v-html="notice.content">
        </div>
      </div>
      <div class="comment-container">

      </div>
      <div class="bottom-container">

      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from "../global/time"
  import  API from "../api/api"
  export default {
    name: "Announce",
    data(){
      return {
        notice: ""
      }
    },
    filters:{
      formatDate(time){
        let date = new Date(time);
        return formatDate(date,"yyyy-MM-dd hh:mm")
      }
    },
    methods: {
      async initNotice(id){
        let res = await API.getNoticeById(id);
        let rd = res.data;
        if(rd.code === 0){
          this.notice = rd.data;
        }
        else {
          console.log("init notice err");
        }
      }
    },
    created(){
      let id = this.$route.params.id;
      console.log("id:",id);
      if(id){
        this.initNotice(id);
      }
    }
  }
</script>

<style scoped>
  .announce-prev {
    text-align: center;
  }
  .title-container {
    /*border-bottom: 1px solid white;*/
    margin: 20px 0 60px 0;
  }
  .title-container div {
    margin-bottom: 10px;
  }
  .page-container {
    text-align: left;
    width: 800px;
    display: inline-block;
    /*border: 1px solid white;*/
    margin-top: 60px;
    animation: ShowVideo 0.4s;
  }
  .content-container {
    margin-bottom: 20px;
    animation: ShowVideo 0.6s;
  }
  .page-container .title-container, .page-container .content-container,
  .page-container .comment-container, .page-container .bottom-container {
    padding: 0 20px;
  }
  .title-container h1 {
    font-weight: 600;
    font-size: 26px;
    line-height: 30px;
  }
</style>
<style>
  .content-container .ctx-text img {
    max-width: 760px;
  }
  .announce .page-container {
    color: white;
  }
</style>