<template>
  <div class="watchVideo Anime">

    <div class="container">
      <el-collapse class="dragArea" v-model="activeNames" accordion>
        <el-collapse-item v-show="!isMatch" title="请将番剧拖入此处" name="1">
          <el-upload class="upload-demo" drag :multiple="false" :auto-upload="false" :on-change="handleChange"
                     action="/">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将番剧拖到此处，或
              <em>点击打开</em>
            </div>
          </el-upload>
        </el-collapse-item>

        <el-dialog
                title="确认番剧"
                :visible.sync="dialogConfirmBangumiVisible"
                top="18vh"
                width="550px"
                v-loading="true"
                @close='closeDialog'
        >
          <div class="bangumi-video-list" v-for="item in videoList">
            <el-button type="text" class="select-bangumi-name" @click="selectBangumi(item)" :key="item.episodeId">
              {{item.bangumiName+' '+item.episodeIndex}}
            </el-button>
          </div>
          <div>
            <el-button type="info" v-on:click="haventResultBtn"
                       style="padding: 6px 20px 6px 20px;margin-top: 20px;border-radius:1px;">以上都不是
            </el-button>
          </div>
        </el-dialog>

        <el-dialog title="提供番剧信息" :visible.sync="postBangumiDialogVisible" width="550px">
          <el-form>
            <!--<el-tooltip content="* 番剧名称定义需要按照以下规则" style="position: relative;z-index: 99999;" placement="top">-->
            <!--<i class="el-icon-warning"></i>-->
            <!--</el-tooltip>-->
            <el-form-item class="post-bangumi-explain">
              <div class="explain-container">
                <span><strong>* 番剧名称定义需要按照以下规则</strong></span><br>
                <span>- 番剧名称以百度百科为准</span><br>
                <span>- 第一个季度直接采取该名称,例如「darker」</span><br>
                <span>- 多个季度,则以「番剧名称+空格+第几季」命名,例如「darker 第二季」</span><br>
                <span>- sp,ova,剧场版规则与以上规则一致,例如「darker ova」</span><br>
                <span>- 当然也不仅限于番剧,电影也是一样可以的</span>
              </div>
            </el-form-item>
            <el-form-item label="番剧名称" label-width="140">
              <el-input auto-complete="off" v-model="postBangumi.bangumiName"
                        style="width: 350px;display: inherit;"></el-input>
            </el-form-item>
            <el-form-item label="是否有第0集">
              <div style="float: left;margin-left: 20px;">
                <el-radio-group size="small" text-color="#141422" v-model="postBangumi.hasZeroIndex">
                  <el-radio border :label="0">没有</el-radio>
                  <el-radio border :label="1">有</el-radio>
                </el-radio-group>
              </div>
            </el-form-item>
            <el-form-item style="margin-bottom: 0">
              <div class="explain-container">
                <span>* 若剧场版或电影则集数为「1」</span><br>
              </div>
            </el-form-item>
            <el-form-item label="总集数" label-width="120">
              <el-input type="text" v-model="postBangumi.episodeTotal" style="width: 80px;display: inherit;"></el-input>
            </el-form-item>
            <el-form-item label="封面">
              <input type="hidden" v-model="postBangumi.thumb">
              <el-button type="primary" size="mini" style="float: left;margin: 7px 0;border: none" @click="show=true">上传封面</el-button>
            </el-form-item>
            <el-form-item>
              <img v-show="postBangumi.thumb" :src="postBangumi.thumb" alt="加载不出来呢" width="100%" style="border-radius: 5px;">
            </el-form-item>
            <el-form-item style="margin-bottom: 0">
              <div class="explain-container">
                <span><strong>* 若本次提交被收录后封面仍可修改 *</strong></span><br>
              </div>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="postBangumiDialogVisible = false" size="small"
                       style="background-color: lightgray;border-color: darkslategray;">取 消
            </el-button>
            <el-button type="primary" @click="sendPostBangumiInfo" size="small">确 定</el-button>
          </div>
        </el-dialog>

        <my-upload field="image"
                   @crop-success="cropSuccess"
                   @crop-upload-success="cropUploadSuccess"
                   @crop-upload-fail="cropUploadFail"
                   v-model="show"
                   :width="620"
                   :height="350"
                   :noCircle="true"
                   :url="GLOBAL.uploadURL"
                   :headers="GLOBAL.uploadHEADERS"
                   :langExt="langExtObj"
                   img-format="jpg"
        ></my-upload>


        <el-collapse-item v-show="!hasInfo " v-on:click="hasInfo = !hasInfo" title="未能正确识别番剧,请手动输入搜索" name="2">

          <div class="search">
            <!-- <el-input v-model="searchInput" placeholder="请输入内容"></el-input> -->
            <!-- <el-button icon="el-icon-search" circle @click="play"></el-button> -->

            <el-select v-model="searchBangumisId" filterable remote reserve-keyword placeholder="请输入番剧关键词"
                       :remote-method="remoteMethod"
                       :loading="loading">
              <el-option v-for="item in searchOption" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
              <el-option v-if="searchOption.length===0 && hasSearch" value="">
                <el-button type="text" style="padding: 0;" v-on:click="postBangumiDialogVisible = true">找不到该番剧?提交给我们吧!
                </el-button>
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

    <div class="container bangumi-header" v-if="bangumiName!==''">
      <div style="width: 50%;margin: 0 auto;">
        <div class="bangumi-name-container">
          <h1 class="bangumi-title">{{bangumiName}}：第{{episodeIndex}}集</h1>
          <div class="re-choose-v2" v-on:click="reSearchBangumi">
            匹配有误？重新选择
          </div>
        </div>
      </div>
      <!--<div v-on:click="reSearchBangumi" class="re-choose">-->
      <!--匹配有误？重新选择-->
      <!--</div>-->
    </div>

    <div class="playerWrapper playerWrapper-showAnim">
      <div id="dplayer">
        <d-player :options="playerOpts" ref="player"></d-player>
      </div>
    </div>

    <div v-show="episodeId!==''" class="cm-container">
      <comment v-on:updateRepliesAndPage="updateRepliesAndPage" :replies="replies" :episode_id="episodeId"
               :page="page"></comment>
    </div>
  </div>


</template>

<script>
  // import '../assets/md5.js'
  import hashMe from "../assets/hashme.js";
  import VueDPlayer from "vue-dplayer";
  import Comment from "./Comment.vue";
  import PostReply from "./PostReply.vue";
  import SparkMD5 from "spark-md5";
  // import "vue-dplayer/vue-dplayer.css";
  // import "DPlayer/dist/DPlayer.min.css";
  import 'vue-dplayer/dist/vue-dplayer.css'
  import API from "../api/api";
  import 'babel-polyfill';
  import myUpload from 'vue-image-crop-upload';
  // import "../assets/vue-dplayer.min.css";

  export default {
    data() {
      return {
        episodeId: "",
        episodeIndex: "",
        watchEpisodeIndex: "",
        episodeTotal: 0,
        searchOption: [],
        searchBangumisId: [],
        bangumiName: "",
        replyable: true,
        videoId:"",
        msgReplyId: "",
        msgEpId: "",
        list: [],
        replies: [],
        page: "",
        loading: false,
        states: [],
        hasInfo: true,
        searchInput: "",
        activeNames: ["1"],
        videoInput: "",
        videoURL: "",
        videoMd5: "",
        videoSize: "",
        isMatch: false,
        // 搜索状态,总共有2种情况，1是未搜索，2是搜索后无结果:
        hasSearch: false,
        dialogConfirmBangumiVisible: false,
        videoList: [],
        // 是否有集数
        hasEpisode: false,
        postBangumiDialogVisible: false,
        postBangumi: {
          bangumiName: "",
          episodeIndex: "",
          hasZeroIndex: 0,
          thumb: ""
        },
        langExtObj:{
          preview:"封面预览"
        },
        show:false,
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
          opacity:1,

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
            api: "http://10.0.46.20:8080/dplayer/",
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
      "comment": Comment,
      "myUpload":myUpload
    },
    watch: {
      searchBangumisId(val) {
        // this.tap("val"+val);
        //获取选择番剧的集数
        let selectBangumis = this.states.filter(item => {
          return item.bangumiId === val;
        });
        if (selectBangumis.length === 0) {
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
        this.tap("in watch videoURL:" + this.videoURL);
        this.episodeIndex = res.data.data.episodeIndex;
        this.episodeId = res.data.data.episodeId;
        this.bangumiName = res.data.data.bangumiName;
        this.hasInfo = true;
        this.initComments();
        this.sendVideoInfo();
      }
    },
    methods: {
      getFileMd5Full(fileRaw) {
        this.tap("getFileFd5Full invoked!");
        var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
          file = fileRaw,
          chunkSize = 4194304,                             // Read in chunks of 4MB
          chunks = Math.ceil((file.size > 16777216 ? 16777216 : file.size) / chunkSize),
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
            console.log("time consumed:" + (new Date() - startData) + "ms");
          }
        };
        fileReader.onerror = function () {
          console.log('oops, something went wrong.');
        };

        function loadNext() {
          var start = currentChunk * chunkSize,
            end = ((start + chunkSize) >= (file.size > 16777216 ? 16777216 : file.size)) ? (file.size > 16777216 ? 16777216 : file.size) : start + chunkSize;
          fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
        }

        loadNext();
        return fullMd5;
      },
      async sendVideoInfo() {
        console.log("发送视频信息");
        let data = {
          ep_id: this.episodeId,
          v_md5: this.videoMd5,
          v_size: this.videoSize
        };
        let res = (await API.sendVideoMatchInfo(data)).data;
        console.log(res);
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
      reSearchBangumi() {
        this.hasInfo = false;
        this.isMatch = false;
        this.activeNames = ["2"];
      },
      async handleChange(file) {
        this.videoURL = file.url;
        //获取视频的弹幕信息
        let vMd5 = await this.getFileMd5(file.raw);
        let fileSize = file.size;

        this.videoMd5 = vMd5;
        this.videoSize = fileSize;

        this.tap(vMd5);
        this.tap(fileSize);
        this.tap("handleFileChange, fileURL:" + this.videoURL);
        this.tap(file);
        let fullMD5 = await this.getFileMd5Full(file.raw);
        this.tap("get FullMD5 done! md5: " + fullMD5);
        //立刻开始播放
        // this.switchVideo(this.videoURL, "");

        //寻找弹幕资源
        this.tap("寻找弹幕资源");
        let resData = (await API.getVideosInfo(fileSize, vMd5)).data;
        this.tap("结束寻找弹幕资源");
        this.tap("episode data :" + resData);

        let videosInfos = resData.data;
        if (resData.code === "0" || resData.msg === "OK") {
          console.log("videoInfo: ", videosInfos);

          // 如果识别的结果不唯一
          if (videosInfos.length > 1) {
            this.dialogConfirmBangumiVisible = true;
            this.videoList = videosInfos;
          }

          if (videosInfos.length === 1) {
            this.isMatch = true;
            this.hasInfo = true;
            let videosInfo = videosInfos[0];
            //成功
            let danmakuId = videosInfo.danmakuId;
            //刷新并装填弹幕
            this.tap("有弹幕, videoURL:" + this.videoURL);
            this.switchVideo(this.videoURL, danmakuId);
            this.bangumiName = videosInfo.bangumiName;
            this.episodeIndex = videosInfo.episodeIndex;
            this.episodeId = videosInfo.episodeId;
            this.tap("setEpId in:" + videosInfo.episodeId);
            this.initComments();
            this.tap("bangumiName:" + this.bangumiName);
            this.tap("episodeIndex:" + this.episodeIndex);
            setTimeout(() => {
              this.$notify({
                title: '识别成功',
                message: this.bangumiName + ' ' + this.episodeIndex,
                type: 'success'
              });
            }, 800)
          }
        } else {
          this.tap("没有弹幕，直接播放, videoURL:" + this.videoURL);
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
        this.tap("videoURL:" + videoURL + "   danmakuId:" + danmakuId);
        const player = this.$refs.player.dp;
        player.switchVideo(
          {
            // url: this.videoURL
            url: videoURL
          },
          {
            id: danmakuId,
            api: "http://10.0.46.20:8080/dplayer/",
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
              return {value: item.bangumiId, label: item.bangumiName};
            });
            this.searchOption = this.list.filter(item => {
              return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
          } else {
            this.hasSearch = true;
          }
        } else {
          this.searchOption = [];
        }
      },
      async initComments() {
        this.tap("episodeId:" + this.episodeId);
        let repliesData = (await API.getRepliesByEpId(this.episodeId)).data;
        this.tap(repliesData);
        if (repliesData.code === "0" || repliesData.msg === "OK") {
          this.tap("get replies:");
          this.tap(repliesData.data.replies);
          this.tap("get page:");
          this.tap(repliesData.data.page);
          this.replies = repliesData.data.replies;
          this.page = repliesData.data.page;
        }
      },
      async initEpisodeInfo(epId) {
        console.log('initEpisodes, epId:', epId);
        let res = await API.getEpisodeInfoByEpId(epId);
        let rd = res.data;
        if (rd.code === 0) {
          console.log("episode:", rd);
          this.bangumiName = rd.data.bangumiName;
          this.episodeIndex = rd.data.episodeIndex;
        }
        else {
          console.log('load Episode by id failled! ', rd.msg);
        }
      },
      async getSpecificReply() {
        if (this.msgReplyId) {
          console.log("getSpecificReply, rid:", this.msgReplyId);
          let res = await API.getSpecificReply(this.msgReplyId);
          let rd = res.data;
          if (rd.code === 0) {
            console.log("specificReply data:", rd.data);
            this.replies = rd.data.replies;
            this.page = rd.data.page;
          }
          else {
            console.log("can't get specific reply info!");
          }
        }
      },
      updateRepliesAndPage(replies, pageInfo) {
        this.replies = replies;
        this.page = pageInfo;
        this.tap("updateRepliesAndPage passed success!");
      },
      goAnchor(selector) {
        let anchor = document.getElementById(selector);
        console.log('selector:', selector);
        console.log('anchor:', anchor);
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
      },
      // 假如根据视频文件的md5+size查找出了多个结果
      // 就展示出一个列表，让用户去选择一个，选择后触发的动作
      selectBangumi(videosInfo) {
        this.isMatch = true;
        let epid = videosInfo.episodeId;
        console.log("选择的epId", epid);
        let danmakuId = videosInfo.danmakuId;
        //刷新并装填弹幕
        this.tap("有弹幕, videoURL:" + this.videoURL);
        this.bangumiName = videosInfo.bangumiName;
        this.episodeIndex = videosInfo.episodeIndex;
        this.episodeId = videosInfo.episodeId;
        this.dialogConfirmBangumiVisible = false;
        this.switchVideo(this.videoURL, danmakuId);
        this.initComments();
        this.tap("setEpId in:" + videosInfo.episodeId);
        this.tap("bangumiName:" + this.bangumiName);
        this.tap("episodeIndex:" + this.episodeIndex);
        this.videoId = videosInfo.videoId;
        this.sendMatchSuccessVideoInfo();
      },
      async sendMatchSuccessVideoInfo(){
        let matchSuccessData = {
          v:this.videoId
        };
        let res = await API.matchVideoSuccess(matchSuccessData);
        let rd = res.data;
        if (rd === 0) {
          console.log("sendMatchSuccessVideoInfo");
        }
      },
      closeDialog() {
        if (!this.isMatch) {
          this.switchVideo(this.videoURL, "");
          this.hasInfo = false;
          this.isMatch = false;
          this.activeNames = ["2"];
          this.bangumiName = "";
          this.episodeIndex = "";
          this.episodeId = "";
          this.replies = [];
        }
      },
      haventResultBtn() {
        this.dialogConfirmBangumiVisible = false;
      },
      async sendPostBangumiInfo() {
        let bangumiName = this.postBangumi.bangumiName;
        let episodeTotal = this.postBangumi.episodeTotal;
        let hasZeroIndex = this.postBangumi.hasZeroIndex;
        let thumb = this.postBangumi.thumb;

        let postBangumiInfo = {
          "bangumiName": bangumiName,
          "episodeTotal":episodeTotal,
          "hasZeroIndex":hasZeroIndex,
          "thumb":thumb
        };
        let rd = (await API.sendPostBangumi(postBangumiInfo)).data;
        if (rd.code === 0) {
          this.$alert(rd.msg, '提交成功', {
            confirmButtonText: '确定',
            callback: action => {
              this.postBangumi.bangumiName = "";
              this.postBangumi.episodeTotal = "";
              this.postBangumi.hasZeroIndex = 0;
              setTimeout(()=> this.postBangumiDialogVisible = false,400);
            }
          });
          // 如果该番剧已经存在了
        } else if (rd.code===5003){
          this.$alert(rd.msg, '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.postBangumi.bangumiName = "";
              this.postBangumi.episodeTotal = "";
              this.postBangumi.hasZeroIndex = 0;
            }
          });
        } else {
          this.$alert(rd.msg, '参数有误', {
            confirmButtonText: '确定',
            callback: action => {
              console.log(action);
            }
          });
        }
      },
      cropUploadSuccess(res, field) {
        console.log('-------- upload success --------');
        console.log(res);
        let link = res.data.link;
        link = link.substring(link.lastIndexOf('/'));
        console.log("link:",link);
        console.log('field: ' + field);
        // console.log('curImageUrl:', this.curImageUrl);
        this.postBangumi.thumb = this.GLOBAL.imgURL+link;

        setTimeout(()=>this.show = false,100);
      },
      cropSuccess(imgDataUrl, field) {
        console.log('-------- crop success --------');

      },
      cropUploadFail(status, field) {
        console.log('-------- upload fail --------');
        console.log(status);
        console.log('field: ' + field);
      },
    },
    mounted() {
      //动画Fix 全屏问题

      setTimeout(() => {
        let d = document.getElementsByClassName("watchVideo")[0];
        if (d) {
          d.setAttribute("class", "watchVideo");
        }
      }, 1000);
      console.log("video.vue mounted!");
      if (this.msgReplyId && this.msgEpId) {
        console.log("go to the reply....");
        setTimeout(() => {
          console.log("times up ,go tt reply1");
          // this.set();
          //  let rr = this.$refs[this.msgReplyId];
          //  console.log("get ref:",rr);
          //  console.log("view more:",rr.view_more);
          //  rr.view_more = true;
          this.goAnchor("r-" + this.msgReplyId);
        }, 1000);
      }
    },
    created() {
      console.log("watch video created!");
      let epid = this.$route.params.epid;
      let rid = this.$route.query.rid;
      if (epid) {
        console.log('successfully get params epid:', epid);
        this.msgEpId = epid;
        this.episodeId = epid;
        this.initEpisodeInfo(epid);
      }
      if (rid) {
        console.log('successfully get query rid:', rid);
        this.msgReplyId = rid;
        this.getSpecificReply();
      }
      else {
        if (epid) {
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
    border-radius: 8px;
    background-color: #0f0f19;
    color: #c5eae7;
    border: 1px solid lightslategray;
  }

  .upload-demo {
    display: inline-block;
  }

  .bangumi-header {
    margin-left: 0;
    margin-right: 0;
    /*margin-bottom: 8px;*/
    height: 30px;
    /*color: #20968b;*/
    color: floralwhite;
  }

  .bangumi-title {
    font-size: 18px;
    font-weight: 400;
    line-height: 18px;
    height: 26px;
    margin-left: 0;
    margin-right: auto;
    margin-bottom: 10px;
    max-width: 700px;
    overflow: hidden;
    text-align: left;
    float: left;
    line-height: 35px;
  }

  .bangumi-name-container {
    width: 100%;
    display: inline-block;
    margin: 0 auto 15px;
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

  .re-choose-v2 {
    background-color: #f36392;
    border: 1px solid #f36392;
    margin-bottom: 10px;
    margin-top: 12px;
    float: right;
    border-radius: 4px;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
  }

  .cm-container {
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    text-align: left;
  }

  .el-form-item {
    margin-bottom: 15px;
  }

  .el-collapse-item__wrap {
    background-color: inherit;
    border: 0;
  }

  .el-collapse-item__header {
    background-color: inherit;
    color: #c5eae7;
    font-size: 16px;
    font-weight: 500;
    border-bottom: 0;
  }

  .el-upload-dragger {
    background-color: inherit;
    border: 1px solid #20968b;
    width: 450px;
  }

  .el-radio__inner {
    display: none;
  }

  .el-radio__label {
    padding-left: 0;
  }

  .el-radio.is-bordered {
    border-color: #5e636f;
  }

  .select-bangumi-name {
    font-size: 17px;
    font-weight: 500;
    color: #e4e4e6;
  }

  .el-dialog__header {
    background-color: #141422;
  }

  .el-dialog__body {
    background-color: #262633;
  }

  .el-dialog__title {
    color: #c5eae7;
  }

  .bangumi-contribute-user-info {
    float: left;
  }

  .el-dialog__footer {
    background-color: #141422;
  }

  .el-form-item__label {
    color: #e4e4e6;
  }

  .el-input__inner {
    background-color: #262633;
    color: #e4e4e6;
    height: 34px;
    border: 1px solid #5e636f;
  }

  .post-bangumi-explain {
    margin-bottom: 0;
    line-height: 30px;
  }

  .post-bangumi-explain span {
    font-size: 13px;
    /*display: inline-block;*/
    float: left;
  }

  .explain-container{
    float: left;
    line-height: 20px;
  }

  .el-message-box{
    background-color: #b1b1b1;
  }
  .el-message-box__content{
    color: black;
  }

  .el-textarea__inner{
    background-color: #262633;
    color: #eeeeee;
    border-color: #5e636f;
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
