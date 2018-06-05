<template>
     <div class="comment-wrapper common">
      <div class="comment-title b-head">
        <span class="results">{{page.totalSize}}</span>评论
      </div>
      <div  class="comm" style="position: relative;">
        <div class="bb-comment ">
          <div class="reply-notice"></div>
          <div class="comment-header clearfix">
            <div class="tabs-order">
              <ul class="clearfix">
                <li class="on" data-sort="0">全部评论</li>
                <li data-sort="2" class="hot-sort" style="display: list-item;">按热度排序</li>
              </ul>
            </div>
            <div class="header-page paging-box">
              <!-- <el-pagination
                  small
                  @current-change="targetPage"
                  @prev-click="prevPage"
                  @next-click="nextPage"
                  :page-size="page.pageSize"
                  :pager-count="11"
                  layout="prev, pager, next"
                  :total="page.parentTotalSize">
              </el-pagination> -->
            </div>
          </div>
          <post-reply v-on:updateRootComment="updateRootComment" :is_top="true" :episode_id="episode_id"></post-reply>
          <div v-show="replies.length>0" class="comment-list">
              <root-reply v-for="(reply,index) in replies" :reply_total="replies.length" :index="index" :replies:="replies" :reply="reply" :key="reply.reply.reply.replyId" :episode_id="episode_id"></root-reply>
          </div>
          <div class="bottom-page paging-box-big">
              <el-pagination v-if="page.parentTotalSize>20"
                    @current-change="targetPage"
                    @prev-click="prevPage"
                    @next-click="nextPage"
                    background
                    :page-size="page.pageSize"
                    :pager-count="11"
                    layout="prev, pager, next"
                    :total="page.parentTotalSize">
              </el-pagination>
          </div>
          <post-reply v-if="replies.length>9" v-on:updateRootComment="updateRootComment" :is_top="true" :episode_id="episode_id"></post-reply>
        </div>
        <emoji-box></emoji-box>
      </div>
    </div>
</template>

<script>
import RootReply from "./RootReply.vue"
import PostReply from "./PostReply.vue"
import EmojiBox from './EmojiBox.vue'
import API from "../api/api";
export default {
    props:[
        "replies","episode_id","page"
    ],
    data(){
        return {
        }
    },
    components:{
        "root-reply": RootReply,
        "post-reply": PostReply,
        "emoji-box": EmojiBox,
    },
    methods:{
        updateRootComment(newReply){
            this.tap("updateRootComment invoked!");
            this.replies.unshift(newReply);
            this.tap("replies.length:"+this.replies.length);
        },
        async loadData(epid, curPage){
            let res = await API.getRepliesByEpIdAndPageNum(epid, curPage);
            let resData =  res.data;
            this.tap("epdi: "+epid+" curPage: "+curPage+" resData:"+resData);
            return resData;
        },
        async nextPage(){
            let resData = (await this.loadData(this.episode_id, this.page.pageNumber+1));
            let pageInfo = resData.data.page;
            let replies = resData.data.replies;
            this.$emit("updateRepliesAndPage",replies,pageInfo);
            this.tap("nextPage invoked!");
        },
        async prevPage(){
            let resData = (await this.loadData(this.episode_id, this.page.pageNumber-1));
            let pageInfo = resData.data.page;
            let replies = resData.data.replies;
            this.$emit("updateRepliesAndPage",replies,pageInfo);
            this.tap("nextPage invoked!");
        },
        async targetPage(val){
            let resData = (await this.loadData(this.episode_id, val));
            let pageInfo = resData.data.page;
            let replies = resData.data.replies;
            this.$emit("updateRepliesAndPage",replies,pageInfo);
            this.tap("nextPage invoked!");
        }
    }
}
</script>

<style>
.comment-wrapper {
    margin: 0 auto;
    width: 50%;
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
    font-family: Microsoft YaHei,Arial,Helvetica,sans-serif;
    zoom: 1;
    min-height: 100px;
    background: #fff;
}
.bb-comment .reply-notice {
    margin-bottom: 10px;
}
.bb-comment .comment-header {
    margin: 0 0 24px;
    border-bottom: 1px solid #e5e9ef;
}
.bb-comment .clearfix {
    zoom: 1;
}
.bb-comment .comment-header .tabs-order {
    float: left;
    margin-bottom: -1px;
}
.bb-comment li, .bb-comment ul {
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
</style>
