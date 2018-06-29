<template>
    <div class="list-item reply-wrap" :id="'r-'+reply.reply.reply.replyId">
        <div class="user-face">
            <a href="#">
              <img :src="reply.reply.user.face?reply.reply.user.face:'/static/defaultface.png'" alt="">
            </a>
            <!-- <a href="#" class="pendant" data-usercard-mid="27629197" target="_blank">
              <img src="/static/1cdf174c75dd6493f3c8f0797e972b69e3293870.png@86w_86h.webp">
            </a> -->
            <div class="hot-follow">
                <!-- <button class="follow-btn" data-mid="27629197" data-uname="CJLN__" data-rpid="809094163">关注</button> -->
            </div>
        </div>
        <div class="con">
            <div class="user">
                <a href="#" target="_blank" class="name vip-red-name">{{reply.reply.user.nick}}</a>
                <!-- <a href="#" target="_blank"><i class="level l4"></i></a> -->
            </div>
            <p class="text">{{reply.reply.reply.content}}</p>
            <div class="info">
                <span class="floor">#{{reply.reply.reply.floor}}</span>
                <span class="plad">来自<a href="#/video" target="_blank">darker.online</a></span>
                <span class="time">{{new Date(reply.reply.reply.createTime).toLocaleString()}}</span>
                <span @click="postAttitide(reply.reply.reply.replyId)" :class="{liked:reply.reply.likeStatus}" class="like "><i></i><span>{{reply.reply.reply.rLike}}</span></span>
                <span class="hate "><i></i></span>
                <span @click="showReplyBox" class="reply btn-hover">回复</span>
                <operation></operation>
            </div>
            <div class="reply-box">
                <!-- <div v-if="reply.reply.totalSize<=3">
                    <sub-reply v-for="m_reply in reply.replies.slice(0,3)" :show_reply_box="show_reply_box" :reply="reply" :m_reply="m_reply" :key="m_reply.reply.replyId" v-on:toggleRB="toggleRB"></sub-reply>
                </div>
                <div v-else>
                    <sub-reply v-for="m_reply in reply.replies.slice(3)" :show_reply_box="show_reply_box" :reply="reply" :m_reply="m_reply" :key="m_reply.reply.replyId" v-on:toggleRB="toggleRB"></sub-reply>
                </div> -->
                <sub-reply v-for="m_reply in (view_more?reply.replies.slice(0,10):reply.replies.slice(0,3))" :show_reply_box="show_reply_box" :reply="reply" :m_reply="m_reply" :key="m_reply.reply.replyId" v-on:toggleRB="toggleRB"></sub-reply>
                <!-- <sub-reply v-else v-for="m_reply in reply.replies.slice(3)" :show_reply_box="show_reply_box" :reply="reply" :m_reply="m_reply" :key="m_reply.reply.replyId" v-on:toggleRB="toggleRB"></sub-reply> -->
                <div v-if="(reply.reply.totalSize>3) && !view_more" @click="viewMore" class="view-more">共<b>{{reply.reply.totalSize}}</b>条回复, <a class="btn-more" data-pid="809139213">点击查看</a></div>
            </div>
            <padding-box v-on:changeSubRepliesPage="changeSubRepliesPage" :sub_replies="reply.replies" :view_more="view_more" :root_reply="reply"></padding-box>
            <post-reply v-if="show_reply_box" :show_reply_box="show_reply_box" v-on:updateSubComment="updateSubComment" v-on:postReplySuccess="postReplySuccess" :episode_id="episode_id" :reply_info="replyInfo"></post-reply>
        </div>
    </div>
</template>

<script>
import SubReply from "./SubReply.vue"
import PaddingBox from "./PaddingBox.vue"
import Operation from  "./Operation.vue"
import PostReply from "./PostReply.vue"
import API from "../api/api";
export default {
    props:[
        "reply","replies","episode_id","page","index","reply_total"
    ],
    data(){
        return {
            reply_root: false,
            show_reply_box: false,
            replyInfo:{
                nick:"",
                p_uid:"",
                p_rid:"",
                is_parent:1,
                prefix: ""
            },
            view_more: false
        }
    },
    components:{
        "sub-reply": SubReply,
        "padding-box": PaddingBox,
        "operation": Operation,
        "post-reply": PostReply
    },
    methods:{
        showReplyBox(){
            this.replyInfo.nick = this.reply.reply.user.nick;
            this.replyInfo.p_uid = this.reply.reply.user.uid;
            this.replyInfo.p_rid = this.reply.reply.reply.replyId;
            this.tap("reply root!");
            this.tap("nick:"+this.replyInfo.nick);
            this.tap("p_uid:"+this.replyInfo.p_uid);
            this.tap("p_rid:"+this.replyInfo.p_rid);
            this.tap("prefix:"+this.replyInfo.prefix);
            this.replyInfo.is_parent = 0;
            this.replyInfo.prefix = "";
            if(this.reply_root){
                this.show_reply_box = !this.show_reply_box;
            }
            else{
                this.show_reply_box = true;
            }
            this.reply_root = true;
        },
        toggleRB(info){
            this.tap("toggle reply box!");
            this.replyInfo = info;
            this.tap("set info!")
            this.show_reply_box = true;
            this.reply_root = false;
        },
        postReplySuccess(){
            this.show_reply_box = false;
            this.tap("post reply success");
        },
        updateSubComment(newReply){
            let rpy = newReply;
            this.tap("updateSubComment invoked!");
            this.reply.replies.push(newReply);
        },
        async postAttitide(rid){
            if(this.reply.reply.likeStatus === 0){
                this.tap("post attitude,rid:"+rid+" action: 1");
                let res = await API.postActiontoReply(rid,1);
                let rd = res.data;
                if(rd.code === 0){
                    this.tap(rd.data);
                    this.reply.reply.likeStatus = 1;
                    this.reply.reply.reply.rLike+=1; 
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
                    this.reply.reply.likeStatus = 0;
                    this.reply.reply.reply.rLike-=1;
                }
                else{
                    this.$message({
                    message: "取消点赞失败",
                    type: "error"
                 });
                }
            }
        },
        viewMore(){
            this.view_more = true;
            this.tap("view_more: "+this.view_more);
        },
        changeSubRepliesPage(sub_replies){
            this.tap("changeSubRepliesPage");
            this.tap("sub_replies:"+sub_replies);
            this.reply.replies = sub_replies;
        }
    },
    created(){
        if(this.reply.reply.is_target === 1){
            this.view_more = true;
            console.log("view more ,true");
        }
        console.log("RootReply created!");
        console.log("reply:",this.reply);
    },
    mounted(){
        console.log("RootReply mounted!");
    }
    
}
</script>

<style>
div{
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
}
/* .bb-comment .comment-list .list-item {
    margin-top: 7px;
} */
.bb-comment .comment-list .list-item .user-face {
    float: left;
    margin: 24px 0 0 5px;
    position: relative;
}
.bb-comment .comment-list .list-item .user-face img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
}
.bb-comment a {
    outline: none;
    color: #00a1d6;
    text-decoration: none;
    cursor: pointer;
}
.bb-comment img {
    border: none;
    vertical-align: middle;
}
.bb-comment .comment-list .list-item .user-face img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
}
.bb-comment .comment-list .list-item .user-face .pendant {
    width: 86px;
    height: 86px;
    position: absolute;
    top: -19px;
    left: -19px;
    display: block;
}
.bb-comment .comment-list .list-item .user-face .pendant img {
    border: 0;
    border-radius: 0;
    width: 86px;
    height: 86px;
}
.bb-comment .comment-list .list-item .user-face .hot-follow {
    text-align: center;
    position: relative;
    top: 18px;
}
.bb-comment .comment-list .list-item .user-face .hot-follow .follow-btn {
    width: 48px;
    height: 24px;
    color: #fff;
    font-size: 12px;
    background-color: #00a1d6;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
}
.bb-comment .comment-list .list-item .con {
    position: relative;
    margin-left: 85px;
    padding: 22px 0 14px;
    border-top: 1px solid#20968b;;
}
.bb-comment .comment-list .list-item .user {
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    padding-bottom: 4px;
    display: block;
    word-wrap: break-word;
}
.bb-comment .comment-list .list-item .user .name {
    color: #6d757a;
}
.bb-comment a {
    outline: none;
    color: #00a1d6;
    text-decoration: none;
    cursor: pointer;
}
.bb-comment .comment-list .list-item .user>a {
    vertical-align: middle;
}
.bb-comment .vip-red-name {
    color: #fb7299!important;
}
.bb-comment .comment-list .list-item .user .level {
    display: inline-block;
    width: 19px;
    height: 9px;
    vertical-align: middle;
    margin: 0 8px;
    background: url(/static/icons-comment.png) no-repeat;
}
.bb-comment .comment-list .list-item .user .level.l4 {
    background-position: -23px -284px;
}
.bb-comment .comment-list .list-item .text {
    line-height: 20px;
    padding: 2px 0;
    font-size: 15px;
    color:rgb(197, 200, 198);
    text-shadow: none;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-word;
}
.bb-comment p {
    margin: 0;
    padding: 0;
}
.bb-comment .comment-list .list-item .info {
    color: #99a2aa;
    line-height: 26px;
    font-size: 12px;
}
.bb-comment .comment-list .list-item .info>span {
    margin-right: 20px;
}
.bb-comment .comment-list .list-item .info .plad a {
    color: #99a2aa;
}
.bb-comment .comment-list .list-item .info .like {
    cursor: pointer;
}
.hate {
    cursor: pointer;
    margin-right: 15px;
}
.like i {
    display: inline-block;
    width: 14px;
    height: 14px;
    vertical-align: text-top;
    margin-right: 5px;
    background: url(/static/icons-comment.png) no-repeat;
    background-position: -153px -25px;
}
.like.liked i {
    background-position: -154px -89px;
}
.hate i {
    display: inline-block;
    width: 14px;
    height: 14px;
    vertical-align: text-top;
    margin-right: 5px;
    background: url(/static/icons-comment.png) no-repeat;
    background-position: -153px -153px;
}
.bb-comment .comment-list .list-item .info .btn-hover {
    padding: 0 5px;
    border-radius: 4px;
    margin-right: 15px;
    cursor: pointer;
    display: inline-block;
}
.view-more {
    font-size: 12px;
    color: #6d757a;
}
</style>


