<template>
    <div  class="comment-send">
        <div class="user-face">
            <img class="user-head" :src="curUserFace?curUserFace:'/static/defaultface.png'">
        </div>
        <div :class="{'focus':activeFocus}" class="textarea-container">
            <i class="ipt-arrow"></i>
            <textarea @focus="addFocusClass" @blur="removeFocusClass" cols="80" name="msg" v-model="content" rows="5" :placeholder="getReplyUser" class="ipt-txt"></textarea>
            <el-tooltip v-model="post_succ"
                        :visible-arrow="false"
                        :manual="true"
                        :hide-after="2"
                        content="发送成功" 
                        placement="top">
                        <button v-on:click="postComment" class="comment-submit" >发表评论</button>
            </el-tooltip>
            <!-- <button v-on:click="postComment" class="comment-submit" >发表评论</button> -->
        </div>

<el-popover
  v-model="show_emoji_box"
  width="400"
  placement="bottom-start"
  trigger="click">

  <div>
      <emoji-box v-on:selectedEmoji="selectedEmoji"></emoji-box>
  </div>
  
  <div ref="mybox" slot="reference" tabindex="1" class="comment-emoji">
            <i class="face"></i>
            <span class="text">表情</span>
  </div>
</el-popover>


        <!-- <div ref="mybox" tabindex="1" class="comment-emoji" @blur="hideEmojiBox" @click="getClickPoint">
            <i class="face"></i>
            <span class="text">表情</span>
        </div> -->
    </div>
</template>

<script>
import API from "../api/api"
import bus from "../assets/eventBus.js"
import EmojiBox from './EmojiBox.vue'
export default {
    props:[
        "replies","m_replies","episode_id","reply_info","show_reply_box","is_top"
    ],
    data(){
        return {  
	    content: "",    
	    r_page: 1, 
	    is_parent: 1,    
	    p_uid: "",  
        p_rid: "",
        pos_x: 0,
        pos_y: 0,
        activeFocus: false,
        show_emoji_box: false,
        post_succ: false,
        curUserFace:""
        };
    },
    components:{
        "emoji-box":EmojiBox
    },
    methods:{
        getCurUserFace(){
            return localStorage.getItem('face');
        },
        selectedEmoji(emoji){
            this.show_emoji_box = false;
            this.content = this.content+emoji;
        },
        addFocusClass(){
            this.tap("add focus");
            this.activeFocus = true;
        },
        removeFocusClass(){
            this.tap("remove focus");
            this.activeFocus = false;
        },
        async postComment(){
            let postCommData = {
                uid: localStorage.getItem("USER_ID"),
                ep_id: this.episode_id,
                content: this.content,
                r_page: 1,
                is_parent:1,
                p_uid:"",
                p_rid:""
            };
            if(!localStorage.getItem("USER_ID")){
                this.tap("useridddddddddd:"+localStorage.getItem("USER_ID"));
                
                this.$message({
                    message: "发送评论请先登陆",
                    type: "warning"
                 });
                 return ;
            };
           if(this.reply_info){
               postCommData.p_uid = this.reply_info.p_uid;
               postCommData.p_rid = this.reply_info.p_rid;
               postCommData.is_parent = this.reply_info.is_parent;
               postCommData.content = this.reply_info.prefix + postCommData.content;
           }
            this.tap("get_uid:"+postCommData.uid);
            this.tap("get_ep_id:"+postCommData.ep_id);
            this.tap("get_p_uid:"+postCommData.p_uid);
            this.tap("get_p_rid:"+postCommData.p_rid);
            this.tap("get_is_parent:"+postCommData.is_parent);
            this.tap("get reply content: "+postCommData.content);
            let res = await API.addReply(postCommData);
            let resData = res.data;
            this.tap(res);
            this.tap(res.status);
            this.tap(resData);
            if(resData.code === 0){
                this.content = "";
                this.tap("post success");
                this.post_succ = true;
                if(this.reply_info){
                    this.tap("has_reply_info and post success");
                    this.$emit("postReplySuccess");
                }
                console.log("rd:",resData);
                let newReply = resData.data;
                if(postCommData.is_parent === 1){
                    console.log("newReply:",newReply);
                    this.tap("update RootComment!");
                    this.$emit("updateRootComment",newReply);
                }
                else{
                    this.tap("update SubComment!");
                    this.$emit("updateSubComment",newReply);
                }
                setTimeout(() => {
                        this.post_succ = false;
                    }, 2000);
            }
            else{
                this.tap("发送评论失败");
            }
        },
    },
    computed:{
        getReplyUser(){
            if(this.reply_info){
                return "回复@"+this.reply_info.nick;
            }
            else{
                return "请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"
            }
        }
    },
    mounted(){
        this.curUserFace = this.getCurUserFace();
    }
}
</script>

<style scoped>
.comment-send {
    margin: 10px 0;
}
.comment-send .user-face {
    float: left;
    margin: 7px 0 0 5px;
    position: relative;
}

.comment-send .user-face .user-head {
    width: 48px;
    height: 48px;
    border-radius: 50%;
}

.comment-send .textarea-container {
    position: relative;
    margin-left: 85px;
    margin-right: 80px;
}
.comment-send .textarea-container textarea {
    font-size: 12px;
    display: inline-block;
    box-sizing: border-box;
    /* background-color: #f4f5f7;
    border: 1px solid #e5e9ef; */
    overflow: auto;
    border-radius: 4px;
    color: #999;
    width: 100%!important;
    height: 65px;
    transition: 0s;
    padding: 5px 10px;
    line-height: normal;
    background-color: #0f0f19;
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid #393945;
    /* width: 100%;
    font-size: 1.414rem;
    height: 3em; */
}
.bb-comment .comment-send .textarea-container.focus textarea,.bb-comment .comment-send .textarea-container:hover textarea{
    background-color:#0f0f19;
    border-color:#00a1d6
}
textarea {
    outline: none;
    resize: none;
}
.comment-send .comment-submit {
    width: 70px;
    height: 64px;
    position: absolute;
    right: -80px;
    top: 0;
    padding: 4px 15px;
    font-size: 14px;
    color: #fff;
    border-radius: 4px;
    text-align: center;
    min-width: 60px;
    vertical-align: top;
    cursor: pointer;
    background-color: #00a1d6;
    border: 1px solid #00a1d6;
    transition: .1s;
    user-select: none;
    outline: none;
}
.comment-send .comment-emoji {
    padding: 0;
    width: 66px;
    height: 24px;
    color: #99a2aa;
    border: 1px solid #e5e9ef;
    border-radius: 4px;
    position: relative;
    z-index: 101;
    font-size: 12px;
    text-align: center;
    line-height: 23px;
    margin-left: 86px;
    margin-top: 3px;
    cursor: pointer;
}
.bb-comment .comment-send .comment-emoji .face {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    width: 16px;
    height: 16px;
    margin-right: 5px;
    background: url(/static/icons-comment.png) no-repeat -408px -24px;
}
.bb-comment .comment-send .comment-emoji .text {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    font-size: 12px!important;
    color: #f9efc1;
}
</style>

