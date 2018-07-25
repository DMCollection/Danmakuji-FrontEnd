<template>
  <div class="sys-container">
    <el-scrollbar style="height: 100%">
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20"
         class="card-container">
      <el-card class="box-card" v-for="notice in sysNotices" :key="notice.id">
        <div class="card-item">
          <div class="item-content">
            <div class="sys-content">
              <div class="ctx-head">
                <span class="title-text">{{notice.title}}</span>
                <span class="time-text">{{getDateDiff(notice.modify_time)}}</span>
              </div>
              <div class="ctx-body">
                <span>{{notice.content}}</span>
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <div v-show="sysNotices.length===0">
        <h1>暂无系统通知</h1>
      </div>
    </div>
    </el-scrollbar>
  </div>
</template>

<script>
  import infiniteScroll from "vue-infinite-scroll";
  import API from "../api/api";
  import {formatDate} from "../global/time";

  export default {
    data() {
      return {
        sysNotices: [],
        page: {pageNumber: 0},
        busy: false
      };
    },
    directives: {
      infiniteScroll
    },
    methods: {
      getDateDiff(time){
        let minute = 1000 * 60;
        let hour = minute * 60;
        let day = hour * 24;
        let now = new Date().getTime();
        let diffValue = now - time;
        if(diffValue < 0){return;}
        let dayC =diffValue/day;
        let hourC =diffValue/hour;
        let minC =diffValue/minute;
        if(dayC>=1){
          return formatDate(new Date(time),"yyyy-MM-dd hh:mm")
        }
        else if(hourC>=1){
          return ""+ parseInt(hourC) +"小时前";
        }
        else if(minC>=1){
          return ""+ parseInt(minC) +"分钟前";
        }else
          return "刚刚";
      },
      async initSysNotices() {
        let uid = localStorage.getItem("USER_ID");
        console.log("init sysNotices!!!");
        console.log("uid:", uid);
        let res = await API.getNotices(uid, "system");
        let rd = res.data;
        console.log("res:", res);
        if (rd.code === 0) {
          this.sysNotices = rd.data.messages;
          this.page = rd.data.pageInfo;
          console.log("likeNotices:", this.sysNotices);
          console.log("page:", this.page);
        } else {
          console.log("没有任何消息");
          console.log(rd.msg);
        }
      },
      loadMore() {
        this.busy = true;
        let uid = localStorage.getItem("USER_ID");
        if (uid) {
          setTimeout(async () => {
            let res = await API.getNoticesBypn(uid, "system", this.page.pageNumber + 1);
            let rd = res.data;
            if (rd.code === 0) {
              if (rd.data.messages.length > 0) {
                this.sysNotices = this.sysNotices.concat(rd.data.messages);
                this.page = rd.data.pageInfo;
                console.log("sysNotices:", this.sysNotices);
                console.log("page:", this.page);
              }
              console.log("loadMore get Data success");
            } else {
              console.log("loadMore失败");
            }
          }, 100);
        }
        this.busy = false;
      }
    },
    created() {
      console.log("likeNotice.vue created");
      // this.initSysNotices();
    }
  };
</script>

<style scoped>
  .sys-container {
    height: 100%;
    width: 100%;
    margin: 0 auto;
    animation: ShowVideo 0.4s;
  }

  .sys-content .ctx-head {
    text-align: left;

  }

  .ctx-head .title-text {
    display: inline-block;
    font-size: 14px;
    color: #009688;
  }

  .ctx-head .time-text {
    display: inline-block;
    margin-left: 10px;
    color: #9e9e9e;
    font-size: 12px;
  }

  .ctx-body {
    color: #dfe9ec;
    font-size: 14px;
  }

</style>

