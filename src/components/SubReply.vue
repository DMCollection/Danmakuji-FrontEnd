<template>
    <div class="reply-item reply-wrap">
        <a href="https://space.bilibili.com/21913953" data-usercard-mid="21913953" target="_blank" class="reply-face">
          <img src="/static/c3c46064847f822b63700b3a7feb784896e61d01.jpg@52w_52h.webp" alt="">
        </a>
        <div class="reply-con">
            <div class="user">
                <a href="https://space.bilibili.com/21913953" target="_blank" data-usercard-mid="21913953" class="name vip-red-name">{{m_reply.user.nick}}</a>
                <a href="https://www.bilibili.com/blackboard/help.html#%E4%BC%9A%E5%91%98%E7%AD%89%E7%BA%A7%E7%9B%B8%E5%85%B3" target="_blank"><i class="level l4"></i></a>
                <span class="text-con">{{m_reply.reply.content}}</span>
            </div>
            <div class="info">
                <span class="time">{{new Date(m_reply.reply.modifyTime).toLocaleString()}}</span>
                <span @click="postAttitide(m_reply.reply.replyId)" :class="{liked:m_reply.likeStatus}" class="like ">
                    <i></i>
                <span>{{m_reply.reply.rLike}}</span>
                </span>
                <span @click="showReplyBox" class="reply btn-hover">回复</span>
                <operation></operation>
            </div>
        </div>
    </div>
</template>

<script scoped>
import operation from "./Operation.vue"
import API from "../api/api";
export default {
    props:["m_reply","reply",],
    data(){
        return {
            replyInfo:{
                nick: "",
                p_uid: "",
                p_rid: "",
                is_parent: 0,
                prefix: ""
            }
        }
    },
    components:{
        "operation": operation
    },
    methods:{
        showReplyBox(){
            this.tap("setInfo from SubRply!")
            this.replyInfo.nick = this.m_reply.user.nick;
            this.replyInfo.p_uid = this.m_reply.user.uid;
            this.replyInfo.p_rid = this.m_reply.reply.parentId;
            this.replyInfo.prefix = "回复 @"+this.m_reply.user.nick+" :";
            this.tap("reply nick: "+this.replyInfo.nick);
            this.tap("reply p_uid: "+this.replyInfo.p_uid);
            this.tap("reply p_rid: "+this.replyInfo.p_rid);
            this.tap("reply prefix: "+ this.replyInfo.prefix);
            this.$emit("toggleRB",this.replyInfo);
        },
        async postAttitide(rid){
            if(this.m_reply.likeStatus === 0){
                this.tap("post attitude,rid:"+rid+" action: 1");
                let res = await API.postActiontoReply(rid,1);
                let rd = res.data;
                if(rd.code === 0){
                    this.tap(rd.data);
                    this.m_reply.likeStatus = 1;
                    this.m_reply.reply.rLike+=1; 
                }
                else{
                    this.$message({
                    message: "点赞失败",
                    type: "error"
                 });
                }
            }
            else{
                this.tap("post attitude,rid:"+rid+" action: 0");
                let res = await API.postActiontoReply(rid,0);
                let rd = res.data;
                if(rd.code === 0){
                    this.tap(rd.data);
                    this.m_reply.likeStatus = 0;
                    this.m_reply.reply.rLike-=1; 
                }
                else{
                    this.$message({
                    message: "取消点赞失败",
                    type: "error"
                 });
                }
            }
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
.bb-comment .comment-list .list-item .reply-box .reply-item .reply-con .user>a {
    position: relative;
    top: -2px;
}
.bb-comment .comment-list .list-item .user .text-con {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
}
.bb-comment .comment-list .list-item .info {
    color: #99a2aa;
    line-height: 26px;
    font-size: 12px;
}
.bb-comment .comment-list .list-item .info>span {
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


