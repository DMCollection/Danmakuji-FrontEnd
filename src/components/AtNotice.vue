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
                <span class="footer-ctx-text"><a target="_blank" :href="'#/video/'+notice.ep_id" class="fo-link">{{notice.title}}</a>评论中@了你</span>
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
      //获取@我的消息
      let res = await API.getNotices(uid, "at");
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
            //获取@我的消息
          let res = await API.getNoticesBypn(uid, "at", this.page.pageNumber + 1);
          let rd = res.data;
          if (rd.code === 0) {
            if(rd.data.messages.length>0){
                this.replyNotices = this.replyNotices.concat(rd.data.messages);
                this.page = rd.data.pageInfo;
                console.log("atNotices:",this.replyNotices);
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
    console.log("atNotice.vue created");
    // this.initReplyNotices();
  }
};
</script>

<style scoped>
.reply-me-container {
    height: 100%;
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