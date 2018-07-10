<template>
  <div class="watchVideo Anime">

    <div class="container">
      <el-collapse class="dragArea" v-model="activeNames" accordion>
        <el-collapse-item title="请将番剧拖入此处" name="1">
          <el-upload class="upload-demo" drag :multiple="false" :auto-upload="false" :on-change="handleChange" action="/">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将番剧拖到此处，或
              <em>点击打开</em>
            </div>
          </el-upload>
        </el-collapse-item>
        
        <el-collapse-item v-show="!hasInfo" title="未能正确识别番剧,请手动输入搜索" name="2">

          <div class="search">
            <!-- <el-input v-model="searchInput" placeholder="请输入内容"></el-input> -->
            <!-- <el-button icon="el-icon-search" circle @click="play"></el-button> -->

            <el-select v-model="searchBangumisId" filterable remote reserve-keyword placeholder="请输入番剧关键词" :remote-method="remoteMethod"
              :loading="loading">
              <el-option v-for="item in searchOption" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>

            <el-select v-model="watchEpisodeIndex" filterable placeholder="请选择集数">
              <el-option v-for="item in episodeTotal" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>

          </div>

        </el-collapse-item>

      </el-collapse>
    </div>

    <div class="container bangumi-header" v-if="bangumiName!=''">
      <h1 class="bangumi-title">{{bangumiName}}：第{{episodeIndex}}集</h1>
      <div v-on:click="hasInfo=!hasInfo" class="re-choose">
         匹配有误？重新选择
      </div> 
    </div> 

    <div class="playerWrapper playerWrapper-showAnim">
      <div id="dplayer">
        <d-player :options="playerOpts" ref="player"></d-player>
      </div>
    </div>

    <div v-show="episodeId!=''" class="cm-container">
      <comment v-on:updateRepliesAndPage="updateRepliesAndPage" :replies="replies" :episode_id="episodeId" :page="page"></comment>
    </div>
  </div>

  

</template>

<script>
// import '../assets/md5.js'
import hashMe from "../assets/hashme.js";
import VueDPlayer from "vue-dplayer";
import Comment from "./Comment.vue"
import PostReply from "./PostReply.vue"
import SparkMD5 from "spark-md5"
// import "vue-dplayer/vue-dplayer.css";
// import "DPlayer/dist/DPlayer.min.css";
import 'vue-dplayer/dist/vue-dplayer.css'
// import "../assets/vue-dplayer.min.css";

import API from "../api/api";

export default {
  data() {
    return {
      episodeId: "",
      episodeIndex: "",
      watchEpisodeIndex:"",
      episodeTotal: 0,
      searchOption: [],
      searchBangumisId: [],
      bangumiName: "",
      replyable: true,
      msgReplyId: "",
      msgEpId: "",
      list: [],
      replies:[],
      page: "",
      loading: false,
      states: [],
      hasInfo: true,
      searchInput: "",
      activeNames: ["1"],
      videoInput: "",
      videoURL: "",
      playerOpts: {
        autoplay: true,
        theme: "#FADFA3",
        lang: "zh-cn",
        screenshot: true,
        hotkey: true,
        preload: "auto",
        // logo: '/static/logo.png',
        volume: 0.7,
        mutex: true,

        video: {
          url: this.videoURL,
          // url: "http://static.smartisanos.cn/common/video/t1-ui.mp4",
          pic: "/static/placeholder.png",
          // thumbnails: "thumbnails.jpg",
          type: "auto"
        },
        // subtitle: {
        //   url: "dplayer.vtt",
        //   type: "webvtt",
        //   fontSize: "25px",
        //   bottom: "10%",
        //   color: "#b7daff"
        // },
        danmaku: {
          id: "null",
          api: "/dplayer/",
          token: "tokendemo",
          maximum: 1000,
          // addition: ["https://api.prprpr.me/dplayer/bilibili?aid=4157142"],
          user: "Father",
          bottom: "15%",
          unlimited: true
        },
        contextmenu: [
          {
            text: "custom1",
            link: "https://github.com/DIYgod/DPlayer"
          },
          {
            text: "custom2",
            click: player => {
              this.tap(player);
            }
          }
        ]
      }
    };
  },
  components: {
    "d-player": VueDPlayer,
    "post-reply": PostReply,
    "comment": Comment
  },
  watch: {
    searchBangumisId(val) {
      // this.tap("val"+val);
      //获取选择番剧的集数
      let selectBangumis = this.states.filter(item => {
        return item.bangumiId == val;
      });
      if (selectBangumis.length == 0) {
        this.episodeTotal = 0;
      } else {
        this.episodeTotal = selectBangumis[0].episodeTotal;
      }
    },
    async watchEpisodeIndex(val) {
      let res = await API.getDanmakujiIdByBangumisIdAndepIndex(
        this.searchBangumisId,
        val
      );
      this.tap(res);
      let danmakuId = res.data.data.danmakuId;
      this.switchVideo(this.videoURL, danmakuId);
      this.tap("in watch videoURL:"+this.videoURL);
      this.episodeIndex = res.data.data.episodeIndex;
      this.episodeId = res.data.data.episodeId;
      this.bangumiName = res.data.data.bangumiName;
      this.hasInfo = true;
      this.initComments();
    }
  },
  methods: {
    getFileMd5Full(fileRaw){
        this.tap("getFileFd5Full invoked!");
        var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
        file = fileRaw,
        chunkSize = 4194304,                             // Read in chunks of 4MB
        chunks = Math.ceil((file.size >16777216?16777216:file.size )/ chunkSize),
        currentChunk = 0,
        spark = new SparkMD5.ArrayBuffer(),
        fileReader = new FileReader();
        var startData = new Date();
        var fullMd5 = "";
        fileReader.onload = function (e) {
        console.log('read chunk nr', currentChunk + 1, 'of', chunks);
        spark.append(e.target.result);                   // Append array buffer
        currentChunk++;

        if (currentChunk < chunks) {
            loadNext();
        } else {
            console.log('finished loading');
            fullMd5 = spark.end();
            console.log('computed hash', fullMd5);  // Compute hash
            console.log("time consumed:"+(new Date()-startData)+"ms");
        }
        };
        fileReader.onerror = function () {
        console.log('oops, something went wrong.');
        };
        function loadNext() {
        var start = currentChunk * chunkSize,
            end = ((start + chunkSize) >= (file.size >16777216?16777216:file.size )) ? (file.size >16777216?16777216:file.size ) : start + chunkSize;
        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
        };
        loadNext();
        return fullMd5;
    },
    play() {
      this.tap("play callback");
      this.tap(this.videoURL);
    },
    getFileMd5(fileRaw) {
      return new Promise((res, rej) => {
        try {
          new hashMe(fileRaw, msg => {
            res(msg);
          });
        } catch (e) {
          rej(e);
        }
      });
    },

    async handleChange(file) {
      this.videoURL = file.url;
      //获取视频的弹幕信息
      let vMd5 = await this.getFileMd5(file.raw);
      let fileSize = file.size;

      this.tap(vMd5);
      this.tap(fileSize);
      this.tap("handleFileChange, fileURL:"+this.videoURL);
      this.tap(file);
      let fullMD5 = await this.getFileMd5Full(file.raw);
      this.tap("get FullMD5 done! md5: "+fullMD5);
      //立刻开始播放
      // this.switchVideo(this.videoURL, "");

      //寻找弹幕资源
      this.tap("寻找弹幕资源");
      let resData = (await API.getVideosInfo(fileSize, vMd5)).data;
      this.tap("结束寻找弹幕资源");
      this.tap("episode data :"+resData);

      let videosInfo = resData.data;
      this.tap("videoInfo: "+videosInfo);
      if (resData.code === "0" || resData.msg === "OK") {
        //成功
        let danmakuId = videosInfo.danmakuId;
        //刷新并装填弹幕
        this.tap("有弹幕, videoURL:"+this.videoURL);
        this.switchVideo(this.videoURL, danmakuId);
        this.bangumiName = videosInfo.bangumiName;
        this.episodeIndex = videosInfo.episodeIndex;
        this.episodeId = videosInfo.episodeId;
        this.tap("setEpId in:"+videosInfo.episodeId);
        this.initComments();
        this.tap("bangumiName:"+this.bangumiName);
        this.tap("episodeIndex:"+this.episodeIndex);
      } else {
        this.tap("没有弹幕，直接播放, videoURL:"+this.videoURL);
        this.switchVideo(this.videoURL, "");
        this.hasInfo = false;
        this.activeNames = ["2"];
        this.bangumiName = "";
        this.episodeIndex = "";
        this.episodeId = "";
        this.replies = [];
      }
    },
    switchVideo(videoURL, danmakuId) {
      this.tap("switch video invoked!");
      this.tap("videoURL:"+ videoURL+"   danmakuId:"+danmakuId);
      const player = this.$refs.player.dp;
      player.switchVideo(
        {
          // url: this.videoURL
          url: videoURL
        },
        {
          id: danmakuId,
          api: "/dplayer/",
          token: localStorage.getItem("JWT_TOKEN"),
          maximum: 1000,
          // addition: ['https://api.prprpr.me/dplayer/bilibili?aid=4157142'],
          user: localStorage.getItem("loginUserName"),
          bottom: "15%",
          unlimited: true
        }
      );
    },
    async remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        this.tap(query);
        let rs = (await API.getsearchBangumisIdResult(query)).data;
        this.loading = false;

        if (rs.code === "0" || rs.msg === "OK") {
          //成功
          this.states = rs.data.content;
          this.list = this.states.map(item => {
            return { value: item.bangumiId, label: item.bangumiName };
          });
          this.searchOption = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }
      } else {
        this.searchOption = [];
      }
    },
    async initComments(){
      this.tap("episodeId:"+this.episodeId);
      let repliesData = (await API.getRepliesByEpId(this.episodeId)).data;
      this.tap(repliesData);
      if(repliesData.code === "0" || repliesData.msg === "OK") {
        this.tap("get replies:");
        this.tap(repliesData.data.replies);
        this.tap("get page:");
        this.tap(repliesData.data.page)
        this.replies = repliesData.data.replies;
        this.page = repliesData.data.page;
      };
    },
    async initEpisodeInfo(epId){
      console.log('initEpisodes, epId:',epId);
      let res = await API.getEpisodeInfoByEpId(epId);
      let rd = res.data;
      if(rd.code === 0){
        console.log("episode:",rd);
        this.bangumiName = rd.data.bangumiName;
        this.episodeIndex = rd.data.episodeIndex;
      }
      else{
        console.log('load Episode by id failled! ',rd.msg);
      };
    },
    async getSpecificReply(){
      if(this.msgReplyId){
        console.log("getSpecificReply, rid:",this.msgReplyId);
        let res = await API.getSpecificReply(this.msgReplyId);
        let rd = res.data;
        if(rd.code === 0){
          console.log("specificReply data:",rd.data);
          this.replies = rd.data.replies;
          this.page = rd.data.page;
        }
        else{
          console.log("can't get specific reply info!");
        }
      }
    },
    updateRepliesAndPage(replies, pageInfo){
      this.replies = replies;
      this.page = pageInfo;
      this.tap("updateRepliesAndPage passed success!");
    },
     goAnchor(selector) {
      let anchor = document.getElementById(selector);
      console.log('selector:',selector);
      console.log('anchor:',anchor);
      if (anchor) {
        console.log("scrollIntoView!!!");
        anchor.scrollIntoView();
      } else {
          this.$message({
          message: "评论已被删除",
          type: "info"
        });
      }
      // document.getElementById('here').scrollIntoView();
    }
  },
  mounted() {
    //动画Fix 全屏问题
       
    setTimeout(() => {
      let d = document.getElementsByClassName("watchVideo")[0];
      if(d){
        d.setAttribute("class", "watchVideo");
      }
    }, 1000);
    console.log("video.vue mounted!")
    if(this.msgReplyId && this.msgEpId){
      console.log("go to the reply....");
      setTimeout(() => {
        console.log("times up ,go tt reply1")
        // this.set();
      //  let rr = this.$refs[this.msgReplyId];
      //  console.log("get ref:",rr);
      //  console.log("view more:",rr.view_more);
      //  rr.view_more = true;
       this.goAnchor("r-"+this.msgReplyId);
    }, 1000);
    }
  },
  created(){
    console.log("watch video created!");
    let epid = this.$route.params.epid;
    let rid = this.$route.query.rid;
    if(epid){
      console.log('successfully get params epid:',epid);
      this.msgEpId = epid;
      this.episodeId = epid;
      this.initEpisodeInfo(epid);
    }
    if(rid){
       console.log('successfully get query rid:',rid);
       this.msgReplyId = rid;
       this.getSpecificReply();
    }
    else{
      if(epid){
        this.initComments();
      }
    }
  }
};
</script>

<style>
.container {
  margin: 2rem auto;
}

.playerWrapper {
  width: 50%;
  margin: 0 auto;
  border-radius: 5px;
  box-shadow: 0px 4px 20px 5px #00000036, 0px 4px 12px 0px #0000009c;
}
/*animation-fill-mode :forwards不能全屏*/
/*给最外层添加.Anime 产生fadeIn动画 */
.Anime .playerWrapper-showAnim {
  opacity: 0;
  animation: ShowVideo 0.6s;
  animation-delay: 0.4s;
  /* animation-fill-mode: forwards; */
}
.dplayer {
  border-radius: 5px;
}
.dragArea {
  animation: ShowVideo 0.4s;
  border: 0;
}
.search {
  width: 80%;
  margin: 2rem auto;
  position: relative;
  animation: ShowVideo 0.4s;
}
.search .el-input {
  width: 80%;
}
.search .el-button {
  right: 40px;
  position: relative;
}
.search input {
  border-radius: 25px;
}
.upload-demo {
  display: inline-block;
}
.bangumi-header {
    margin-left: 0px;
    margin-right:  0px;
    margin-bottom: 8px;
    height: 30px;
    color:#20968b;
}
.bangumi-title {
   font-size: 18px;
   font-weight: 400;
   line-height: 18px;
   height: 26px;
   margin-left: auto;
   margin-right: auto;
   margin-bottom: 10px;
   max-width: 700px;
   overflow: hidden;
}
.re-choose {
    background-color: #f36392;
    border: 1px solid #f36392;
    margin-bottom: 10px;
    border-radius: 4px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    float: right;
}
.cm-container {
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  text-align: left;
}
.el-collapse-item__wrap{
  background-color: inherit;
  border: 0;
}
.el-collapse-item__header{
  background-color:inherit;
  color: #c5eae7;
  font-size: 16px;
  font-weight: 500;
  border-bottom:0;
}
.el-upload-dragger{
  background-color: inherit;
  border: 1px solid#20968b;
  width: 450px;
}
@keyframes ShowVideo {
  0% {
    opacity: 0;
    transform: scale(0.5) translateY(-8em);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
