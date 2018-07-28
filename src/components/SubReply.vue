<template>
  <div class="reply-item reply-wrap" :id="'r-'+m_reply.reply.replyId">
    <a :href="'#/user/'+m_reply.user.uid" target="_blank" class="reply-face">
      <img :src="m_reply.user.face?m_reply.user.face:'/static/akari.jpg'" alt="">
    </a>
    <div class="reply-con">
      <div class="user">
        <a :href="'#/user/'+m_reply.user.uid" target="_blank" class="name vip-red-name">{{m_reply.user.nick}}</a>
        <span class="text-con">{{m_reply.reply.content}}</span>
      </div>
      <div class="info">
        <span class="time">{{getDateDiff(m_reply.reply.modifyTime)}}</span>
        <span @click="postAttitide(m_reply.reply.replyId)" :class="{liked:m_reply.likeStatus}" class="like ">
                    <i></i>
                <span>{{m_reply.reply.rLike}}</span>
                </span>
        <span @click="showReplyBox" class="reply btn-hover">回复</span>
        <operation v-on:delSubReply="delSubReply"
                   :root="is_root"
                   :r_uid="m_reply.user.uid"
                   :reply_id="m_reply.reply.replyId"
                   :index="index"
        >

        </operation>
      </div>
    </div>
  </div>
</template>

<script scoped>
  import operation from "./Operation.vue"
  import API from "../api/api";
  import {formatDate} from "../global/time";

  export default {
    props: ["m_reply", "reply","index"],
    data() {
      return {
        replyInfo: {
          nick: "",
          p_uid: "",
          p_rid: "",
          is_parent: 0,
          prefix: ""
        },
        is_root: false
      }
    },
    components: {
      "operation": operation
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
          return formatDate(new Date(time),"yyyy-MM-dd hh:mm");
        }
        else if(hourC>=1){
          return ""+ parseInt(hourC) +"小时前";
        }
        else if(minC>=1){
          return ""+ parseInt(minC) +"分钟前";
        }else
          return "刚刚";
      },
      showReplyBox() {
        this.tap("setInfo from SubRply!")
        this.replyInfo.nick = this.m_reply.user.nick;
        this.replyInfo.p_uid = this.m_reply.user.uid;
        this.replyInfo.p_rid = this.m_reply.reply.parentId;
        this.replyInfo.prefix = "回复 @" + this.m_reply.user.nick + " :";
        this.tap("reply nick: " + this.replyInfo.nick);
        this.tap("reply p_uid: " + this.replyInfo.p_uid);
        this.tap("reply p_rid: " + this.replyInfo.p_rid);
        this.tap("reply prefix: " + this.replyInfo.prefix);
        this.$emit("toggleRB", this.replyInfo);
      },
      async postAttitide(rid) {
        if(!localStorage.getItem("USER_ID")){
          this.tap("useridddddddddd:"+localStorage.getItem("USER_ID"));

          this.$message({
            message: "请先登陆",
            type: "warning"
          });
          return ;
        };
        if (this.m_reply.likeStatus === 0) {
          this.tap("post attitude,rid:" + rid + " action: 1");
          let res = await API.postActiontoReply(rid, 1);
          let rd = res.data;
          if (rd.code === 0) {
            this.tap(rd.data);
            this.m_reply.likeStatus = 1;
            this.m_reply.reply.rLike += 1;
          }
          else {
            this.$message({
              message: "点赞失败",
              type: "error"
            });
          }
        }
        else {
          this.tap("post attitude,rid:" + rid + " action: 0");
          let res = await API.postActiontoReply(rid, 0);
          let rd = res.data;
          if (rd.code === 0) {
            this.tap(rd.data);
            this.m_reply.likeStatus = 0;
            this.m_reply.reply.rLike -= 1;
          }
          else {
            this.$message({
              message: "取消点赞失败",
              type: "error"
            });
          }
        }
      },
      delSubReply(index){
        console.log("delSubReply in SubReply.vue, index:",index);
        this.reply.replies.splice(index,1);
      }
    }
  }
</script>

<style>
  .bb-comment .comment-list .list-item .reply-box .reply-item {
    padding: 10px 0;
  }

  .bb-comment .comment-list .list-item .reply-box .reply-item .reply-face {
    float: left;
    margin: 5px 0 0;
  }

  .bb-comment .comment-list .list-item .reply-box .reply-item .reply-face img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  .bb-comment .comment-list .list-item .reply-box .reply-item .reply-con {
    margin-left: 34px;
  }

  .bb-comment .comment-list .list-item .user {
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    padding-bottom: 4px;
    display: block;
    word-wrap: break-word;
  }

  .bb-comment .comment-list .list-item .reply-box .reply-item .reply-con .user .name {
    position: relative;
    top: -1px;
  }

  .bb-comment .comment-list .list-item .reply-box .reply-item .reply-con .user > a {
    position: relative;
    top: -2px;
  }

  .bb-comment .comment-list .list-item .user .text-con {
    font-weight: 400;
    font-size: 15px;
    color: rgb(197, 200, 198);
    line-height: 20px;
    margin-left: 10px;
  }

  .bb-comment .comment-list .list-item .info {
    color: #99a2aa;
    line-height: 26px;
    font-size: 12px;
  }

  .bb-comment .comment-list .list-item .info > span {
    margin-right: 20px;
  }

  .bb-comment .comment-list .list-item .info .like {
    cursor: pointer;
  }

  .like.liked i {
    background-position: -154px -89px;
  }

  .bb-comment .comment-list .list-item .info .btn-hover {
    padding: 0 5px;
    border-radius: 4px;
    margin-right: 15px;
    cursor: pointer;
    display: inline-block;
  }
</style>


