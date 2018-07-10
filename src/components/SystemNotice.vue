<template>
    <div class="sys-container">
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20" class="card-container">
    <el-card class="box-card" v-for="notice in sysNotices" :key="notice.id">
    <div class="card-item">
    <div class="item-content">
        <div class="sys-content">
          <div class="ctx-head">
              <span class="title-text">{{notice.title}}</span>
              <span class="time-text">{{new Date(notice.modify_time).toLocaleString()}}</span>
          </div>
          <div class="ctx-body">
                <span>{{notice.content}}</span>
          </div>
        </div>
     </div>
    </div>
    </el-card>
    </div>
    </div>
</template>

<script>
import infiniteScroll from "vue-infinite-scroll";
import API from "../api/api";

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
        setTimeout( async () => {
          let res = await API.getNoticesBypn(uid, "system", this.page.pageNumber + 1);
          let rd = res.data;
          if (rd.code === 0) {
            if(rd.data.messages.length>0){
                this.sysNotices = this.sysNotices.concat(rd.data.messages);
                this.page = rd.data.pageInfo;
                console.log("sysNotices:",this.sysNotices);
                console.log("page:",this.page);
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
    this.initSysNotices();
  }
};
</script>

<style scoped>
.sys-container {
  height: 100%;
  width: 100%;
  margin: 0 auto;
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
    color: #0097d0;
    font-size: 14px;
}

</style>

