<template>
    <div class="reply-me-container">

    <div class="card-container">
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
            <img :src="notice.publisher.face?notice.publisher.face:'/static/defaultface.png'" class="avatar" />
        </div>
        <div class="reply-content">
            <div class="nick-time">
                <span class="nick-text">{{notice.publisher.nick}}</span>
                <span class="time-text">{{new Date(notice.modify_time).toLocaleString()}}</span>
            </div>
            <div class="reply-ctx">
                <a :href="'#/video/'+notice.ep_id+'?rid='+notice.reply_id" class="reply-text">{{notice.content}}</a>
            </div>
        </div>
     </div>
        <div class="item-footer">
            <div class="footer-ctx">
                <span class="footer-ctx-text"><a :href="'#/video/'+notice.ep_id" class="fo-link">{{notice.msg}}</a>评论中回复了你</span>
            </div>
         </div>
        </div>
         </el-card>
    </div>

    </div>
</template>

<script>
import API from "../api/api";

export default {
    data(){
        return  {
            replyNotices:[],
            page:""
        }
    },
    methods:{
        async initReplyNotices(){
            let uid = localStorage.getItem("USER_ID");
            console.log("init replyNotices!!!");
            console.log("uid:",uid);
            let res = await API.getNotices(uid,"reply");
            let rd = res.data;
            console.log("res:",res);
            if(rd.code === 0){
                this.replyNotices = rd.data.messages;
                this.page = rd.data.pageInfo;
                console.log("replyNotices:",this.replyNotices);
                console.log("page:",this.page);
            }
            else{
                console.log("没有任何消息");
                console.log(rd.msg);
            }
        }
    },
    created(){
        console.log("replyNotice.vue created");
        this.initReplyNotices()
    }
}
</script>

<style scoped>
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
.card-container .el-card{
    background-color:#262633;
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
.nick-time span {
    color: #009688;
}
.nick-time .nick-text {
    font-size: 16px;
    font-weight: 700;
}
.nick-time .time-text {
    color: #9E9E9E;
    font-size: 12px;
    line-height: 22px;
    margin: 0 10px;
}
.reply-ctx {
    text-align: left;
}
.reply-ctx .reply-text {
    color: #0097d0;
    cursor: pointer;
    border: 0;
    outline: 0;
    text-decoration: none;
}
.item-footer {
    padding: 15px 0 0 64px;
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
    font-size: 14px;
}
.fo-link {
    color: #0097d0;
    cursor: pointer;
    margin-left: 8px;
}
</style>

