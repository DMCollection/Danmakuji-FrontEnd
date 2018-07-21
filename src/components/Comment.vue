<template>
  <div class="comment-wrapper common">
    <div style="color:#f9efc1;" class="comment-title b-head">
      <span class="results">{{page.totalSize}}</span>评论
    </div>
    <div class="comm" style="position: relative;">
      <div class="bb-comment ">
        <div class="reply-notice"></div>
        <div class="comment-header clearfix">
          <div class="tabs-order">
            <ul class="clearfix">
              <li class="on" data-sort="0">全部评论</li>
              <li @click="refreshComment" class="hot-sort" style="display: list-item;">
                <i v-show="!refreshLoading" class="el-icon-refresh"></i>
                <i v-show="refreshLoading" class="el-icon-loading"></i>
                刷新评论</li>
            </ul>
          </div>
          <div class="header-page paging-box">
          </div>
        </div>
        <post-reply v-on:updateRootComment="updateRootComment" :is_top="true" :episode_id="episode_id"></post-reply>
        <div v-show="replies.length>0" class="comment-list">
            <!--热门评论-->
          <div v-if="page.pageNumber === 1">
            <root-reply v-for="(reply,index) in hot" :reply_total="replies.length" :index="index" :replies="hot"
                        :reply="reply" :key="reply.reply.reply.replyId+reply.reply.reply.rLike" :episode_id="episode_id"></root-reply>

            <div class="hot-line">
              <span @click="readMoreHot">以上为热门评论，<a class="more-hot">查看更多</a></span>
            </div>
          </div>

          <root-reply v-for="(reply,index) in replies" :reply_total="replies.length" :index="index" :replies="replies"
                      :reply="reply" :key="reply.reply.reply.replyId" :episode_id="episode_id"></root-reply>
        </div>
        <div class="bottom-page paging-box-big">
          <el-pagination v-if="page.parentTotalSize>20"
                         @current-change="targetPage"
                         :current-page.sync="page.pageNumber"
                         :pager-count="11"
                         :page-size="page.pageSize"
                         layout="total, prev, pager, next, jumper" :total="page.parentTotalSize">
          </el-pagination>
        </div>
        <!-- <post-reply v-if="replies.length>9" v-on:updateRootComment="updateRootComment" :is_top="true" :episode_id="episode_id"></post-reply> -->
      </div>
      <!-- <emoji-box></emoji-box> -->
    </div>
  </div>
</template>

<script>
  import RootReply from "./RootReply.vue";
  import PostReply from "./PostReply.vue";
  import EmojiBox from "./EmojiBox.vue";
  import API from "../api/api";

  export default {
    props: ["replies", "episode_id", "page","hot"],
    data() {
      return {
        refreshLoading:false
      };
    },
    components: {
      "root-reply": RootReply,
      "post-reply": PostReply,
      "emoji-box": EmojiBox
    },
    methods: {
      async refreshComment() {
        console.log("refresh comments");
        this.refreshLoading = true;
        let res = await this.loadData(this.episode_id, this.page.pageNumber);
        let rd = res.data;
        if (rd.code === 0) {
          this.replies = rd.replies;
          this.page = rd.page;
          if (typeof rd.hot !== 'undefined') {
            this.hot = rd.hot;
          }
        }
        this.refreshLoading = false;
      },
      updateRootComment(newReply) {
        this.tap("updateRootComment invoked!");
        this.replies.unshift(newReply);
        this.tap("replies.length:" + this.replies.length);
        // this.page.totalSize+=1;
        // this.page.parentTotalSize+=1;
      },
      async loadData(epid, pageNum) {
        let res = await API.getRepliesByEpIdAndPageNum(epid, pageNum);
        let resData = res.data;
        this.tap(
          "epdi: " + epid + " pageNum: " + pageNum + " resData:" + resData
        );
        return resData;
      },

      async targetPage(val) {
        let resData = await this.loadData(this.episode_id, val);
        let pageInfo = resData.data.page;
        let replies = resData.data.replies;
        this.$emit("updateRepliesAndPage", replies, pageInfo);
        this.tap("targetPage invoked!");
      },

      readMoreHot(){
        this.$message.info("先不写了,好累");
      },


      // async handleSizeChange(val){
      //     this.tap("pageSize:"+val);
      //     let resData = (await this.loadData(this.episode_id, this.page.pageNumber, val));
      //     let pageInfo = resData.data.page;
      //     let replies = resData.data.replies;
      //     this.$emit("updateRepliesAndPage",replies,pageInfo);
      //     this.tap("targetPage invoked!");
      // }
    },
    mounted() {
      console.log("comment.vue mounted!");
    }
  };
</script>

<style>
  .comment-wrapper {
    margin: 0 auto;
    /* width: 50%; */
    width: 870px;
  }

  @media screen and (max-width: 1400px) {
    .comment-wrapper {
      width: 690px;
    }
  }

  .clearfix:after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    clear: both;
  }

  .comment-wrapper .comment-title {
    padding-top: 18px;
    font-size: 18px;
    line-height: 20px;
    height: 20px;
    color: #222;
    margin-bottom: 10px;
  }

  .comment-wrapper .comment-title span {
    margin-right: 10px;
  }

  .comment-wrapper .comm {
    min-height: 300px;
  }

  .bb-comment {
    font-family: Microsoft YaHei, Arial, Helvetica, sans-serif;
    zoom: 1;
    min-height: 100px;
    /* background: #fff; */
  }

  .bb-comment .reply-notice {
    margin-bottom: 10px;
  }

  .bb-comment .comment-header {
    margin: 0 0 24px;
    /* border-bottom: 1px solid #e5e9ef; */
    border-bottom: 1px solid #20968b;
  }

  .bb-comment .clearfix {
    zoom: 1;
  }

  .bb-comment .comment-header .tabs-order {
    float: left;
    margin-bottom: -1px;
  }

  .bb-comment li,
  .bb-comment ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .clearfix {
    zoom: 1;
  }

  .bb-comment .comment-header .tabs-order li {
    background-color: transparent;
    border-radius: 0;
    border: 0;
    padding: 8px 0;
    margin-right: 16px;
    border-bottom: 1px solid transparent;
    position: relative;
    float: left;
    cursor: pointer;
    line-height: 20px;
    height: 20px;
    font-size: 14px;
    font-weight: 700;
    color: #222;
  }

  .bb-comment .comment-header .tabs-order li.on {
    border-bottom: 1px solid #00a1d6;
    color: #00a1d6;
  }

  .bb-comment .comment-header .tabs-order li.hot-sort {
    display: none;
    color: bisque;
  }

  .bb-comment .comment-header .tabs-order li:last-child {
    margin: 0 16px;
  }

  .bb-comment .comment-header .header-page {
    float: right;
    line-height: 36px;
  }

  .paging-box {
    font-size: 12px;
  }

  /* .paging-box .result {
      padding-right: 10px;
  }
  .paging-box .disabled {
      display: none;
  }
  .paging-box current {
      color: #00a1d6;
      font-weight: 700;
  }
  .paging-box .dian {
      cursor: default;
  } */
  .bb-comment .comment-list {
    padding-top: 20px;
  }

  .bb-comment .bottom-page {
    margin: 20px 0;
  }

  .paging-box-big {
    font-size: 12px;
  }

  .bb-comment .hot-line{
    text-align: center;
    border-bottom: 1px solid #e5e9ef;
    position: relative;
    margin: 40px 0 40px 85px;
    font-size: 12px
  }

  .bb-comment .hot-line span {
    position: absolute;
    top: -7px;
    margin-left: -115px;
    padding: 0 20px;
    background: #141422;
    color: #e4e4e6;
  }

  .bb-comment a {
    outline: none;
    color: #00a1d6;
    text-decoration: none;
    cursor: pointer;
  }

  .el-pagination .btn-prev {
    background-color: rgba(20, 20, 34, 0.9);
  }

  .el-pagination .number {
    background-color: rgba(20, 20, 34, 0.9);
  }

  .el-pagination .btn-next {
    background-color: rgba(20, 20, 34, 0.9);
  }

  .el-pagination button:disabled {
    background-color: rgba(20, 20, 34, 0.9);
  }

  .el-pagination__editor .el-input__inner {
    background-color: #0f0f19;
  }
</style>
