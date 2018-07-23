<template>
  <div class="like-container">
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20"
         class="card-container">
      <el-card class="box-card" v-for="notice in likeNotices" :key="notice.id">
        <div class="card-item">
          <div class="item-content">
            <div class="user-face">
              <!--<img src="/static/like.png" class="avatar"/>-->
              <div class="like-image-holder">
                <img src="/static/like2.png" class="avatar2"/>
              </div>

            </div>
            <div class="reply-content">
              <div class="like-ctxs">
                <a :href="'#/user/'+notice.publisher.uid" target="_blank"
                   class="nick-text">{{notice.publisher.nick}}</a>
                <div class="like-ctx">
                  <a :href="'#/video/'+notice.ep_id+'?rid='+notice.reply_id" target="_blank" class="reply-text">{{notice.content}}</a>
                </div>
                <span class="time-text">{{new Date(notice.modify_time).toLocaleString()}}</span>
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <div v-show="likeNotices.length===0">
        <h1>暂无点赞</h1>
      </div>
    </div>
  </div>
</template>

<script>
  import infiniteScroll from "vue-infinite-scroll";
  import API from "../api/api";

  export default {
    data() {
      return {
        likeNotices: [],
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
        console.log("init likeNotices!!!");
        console.log("uid:", uid);
        let res = await API.getNotices(uid, "like");
        let rd = res.data;
        console.log("res:", res);
        if (rd.code === 0) {
          this.likeNotices = rd.data.messages;
          this.page = rd.data.pageInfo;
          console.log("likeNotices:", this.likeNotices);
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
            let res = await API.getNoticesBypn(uid, "like", this.page.pageNumber + 1);
            let rd = res.data;
            if (rd.code === 0) {
              if (rd.data.messages.length > 0) {
                this.likeNotices = this.likeNotices.concat(rd.data.messages);
                this.page = rd.data.pageInfo;
                console.log("likeNotices:", this.likeNotices);
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
      // this.initReplyNotices();
    }
  };
</script>

<style scoped>
  .like-container {
    height: 100%;
    width: 100%;
    margin: 0 auto;
  }

  .user-face {
    margin-right: 10px;
  }

  .avatar {
    display: block;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    -ms-flex-negative: 0;
    flex-shrink: 0;
  }

  .reply-content {
    text-align: left;
    padding-top: 4px;
    margin-left: 10px;
  }

  .like-ctx {
    display: inline;
    margin-left: 18px;
    font-size: 14px;
    line-height: 24px;
    color: #009688;;
  }

  .reply-text {
    color: #0097d0;
    cursor: pointer;
    border: 0;
    outline: 0;
    font-size: 14px;
    text-decoration: none;
  }

  .like-ctxs .nick-text {
    color: #009688;
  }

  .like-ctx a:hover {
    cursor: pointer;
    color: #00c0ff;
  }

  .like-ctxs .time-text {
    color: #9e9e9e;
    font-size: 12px;
    line-height: 44px;
    margin: 0 10px;
  }

  .avatar2{
    /*width: 32px;*/
    /*height: 32px;*/
    padding-top: 5px;
  }
  .like-image-holder{
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #303133;
  }

</style>

