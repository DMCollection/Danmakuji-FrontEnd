<template>
    <div class="reply-me-container">
        <el-scrollbar class="m-scroll" style="height:100%">
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20" class="card-container">
    <el-card class="box-card" v-for="notice in replyNotices" :key="notice.id">
    <div class="card-item">
        <el-popover
        popper-class="del-pop"
        placement="bottom"
        trigger="click"
        >
        <div>删除</div>
       <el-button slot="reference" 
       icon="el-icon-more" 
       style="float: right;padding: 2px 0;color:#999;transform: rotate(90deg);font-size:18px" 
       type="text"
       >
       </el-button>
    </el-popover>
    <div class="item-content">
        <div class="user-face">
          <a :href="'#/user/'+notice.publisher.uid" target="_blank">
            <img :src="notice.publisher.face?notice.publisher.face:'/static/defaultface.png'" class="avatar" />
          </a>
        </div>
        <div class="reply-content">
            <div class="nick-time">
                <a :href="'#/user/'+notice.publisher.uid" target="_blank" class="nick-text">{{notice.publisher.nick}}</a>
                <span class="time-text">{{new Date(notice.modify_time).toLocaleString()}}</span>
            </div>
            <div class="reply-ctx">
                <a :href="'#/video/'+notice.ep_id+'?rid='+notice.reply_id" target="_blank" class="reply-text">{{notice.content}}</a>
            </div>
        </div>
     </div>
        <div class="item-footer">
            <div class="footer-ctx">
                <span class="footer-ctx-text"><a target="_blank" :href="'#/video/'+notice.ep_id" class="fo-link">{{notice.title}}</a>评论中回复了你</span>
            </div>
         </div>
        </div>
         </el-card>
    </div>
        </el-scrollbar>
    </div>
</template>

<script>
import infiniteScroll from "vue-infinite-scroll";
import API from "../api/api";

export default {
  data() {
    return {
      replyNotices: [],
      page: {pageNumber: 0},
      busy: false
    };
  },
  directives: {
    infiniteScroll
  },
  methods: {
    async initReplyNotices() {
      let uid = localStorage.getItem("USER_ID");
      console.log("init replyNotices!!!");
      console.log("uid:", uid);
      let res = await API.getNotices(uid, "reply");
      let rd = res.data;
      console.log("res:", res);
      if (rd.code === 0) {
        this.replyNotices = rd.data.messages;
        this.page = rd.data.pageInfo;
        console.log("replyNotices:", this.replyNotices);
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
          let res = await API.getNoticesBypn(uid, "reply", this.page.pageNumber + 1);
          let rd = res.data;
          if (rd.code === 0) {
            if(rd.data.messages.length>0){
                this.replyNotices = this.replyNotices.concat(rd.data.messages);
                this.page = rd.data.pageInfo;
                console.log("replyNotices:",this.replyNotices);
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
    console.log("replyNotice.vue created");
    // this.initReplyNotices();
  }
};
</script>

<style scoped>
.reply-me-container {
    height: 100%;
}
.sn-container {
  text-align: center;
  width: 100;
  margin: 0 auto;
}
.avatar {
  display: block;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}
</style>
<style>
.del-pop {
  min-width: 20px !important;
  width: 30px !important;
}

.card-container {
    max-height: 1000px;
    overflow-y: auto;
}
.card-container .el-card {
  background-color: #262633;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 10px;
  border: 0;
}
.item-content {
  display: flex;
}
.user-face {
  width: 46px;
  height: 46px;
  margin-right: 20px;
}
.nick-time {
  text-align: left;
}
.nick-time span {
  color: #009688;
}
.nick-time a {
  color: #9e9e9e;
}
.nick-time a:hover {
  color: #009688;
}
.nick-time .nick-text {
  font-size: 16px;
  font-weight: 700;
}
.nick-time .time-text {
  color: #9e9e9e;
  font-size: 12px;
  line-height: 22px;
  margin: 0 10px;
}
.reply-ctx {
  text-align: left;
}
.reply-ctx a:hover {
  color: #00c0ff;
}
.reply-ctx .reply-text {
  color: #0097d0;
  cursor: pointer;
  border: 0;
  outline: 0;
  font-size: 14px;
  text-decoration: none;
}
.item-footer {
  padding: 5px 0 0 64px;
}
.item-footer .footer-ctx {
  padding: 0 7px;
  border-radius: 13px;
  color: #999;
  background-color: #423944;
  line-height: 24px;
}
.footer-ctx-text {
  display: block;
  width: 600px;
  text-align: left;
  font-size: 12px;
}
.footer-ctx-text a:hover {
  color: #00c0ff;
}
.fo-link {
  color: #0097d0;
  cursor: pointer;
  margin-left: 8px;
}
.m-scroll .el-scrollbar__wrap {
    overflow: auto;
}
</style>


