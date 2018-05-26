<template>
<div class="container">
<el-collapse class="dragArea" v-model="activeNames" accordion>
  <el-collapse-item title="请将番剧拖入此处" name="1">
  <el-upload
  class="upload-demo"
  :multiple="false"
  :auto-upload="false"
  :on-change="handleChange"
  action="/">
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将番剧拖到此处，或<em>点击打开</em></div>
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

            <el-select v-model="episodeId" filterable placeholder="请选择集数">
              <el-option v-for="item in episodeTotal" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>

          </div>

        </el-collapse-item>

      </el-collapse>
    </div>

    <div class="playerWrapper playerWrapper-showAnim">
      <div id="dplayer">
        <d-player :options="playerOpts" ref="player"></d-player>
      </div>
    </div>
  </div>

</template>

<script>
// import '../assets/md5.js'
import hashMe from "../assets/hashme.js";
import VueDPlayer from "vue-dplayer";
// import '../node_modules/vue-dplayer/vue-dplayer.css'
import "DPlayer/dist/DPlayer.min.css";
import axios from "axios";
import API from "../api/api";
// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (localStorage.JWT_TOKEN) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `${localStorage.JWT_TOKEN}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
export default {
  data() {
    return {
      episodeId: "",
      episodeTotal: 0,
      searchOption: [],
      searchBangumisId: [],
      list: [],
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
          thumbnails: "thumbnails.jpg",
          type: "auto"
        },
        subtitle: {
          url: "dplayer.vtt",
          type: "webvtt",
          fontSize: "25px",
          bottom: "10%",
          color: "#b7daff"
        },
        danmaku: {
          id: "9E2E3368B56CDBB4",
          api: "https://api.prprpr.me/dplayer/",
          token: "tokendemo",
          maximum: 1000,
          addition: ["https://api.prprpr.me/dplayer/bilibili?aid=4157142"],
          user: "DIYgod",
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
    "d-player": VueDPlayer
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
    async episodeId(val) {
      let res = await API.getDanmakujiIdByBangumisIdAndepIndex(
        this.searchBangumisId,
        val
      );
      let danmakuId = res.data.danmakuId;
      this.switchVideo(this.videoURL, danmakuId);
    }
  },
  methods: {
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
    async login() {
      let testAccount = {
        principal: "darker",
        password: "darkerpwd",
        remember_me: 1
      };
      let res = await API.login(testAccount);
      this.tap(res);
      // let res=await axios.post('/api/auth/login',{principal:"darker",password:"darkerpwd",remember_me:1});
      let token = res.data.data.token;

      //在这之前先检测localStorage , 若不存在则保存本地变量
      //保存到localStorage
      localStorage.setItem("JWT_TOKEN", token);
    },
    async handleChange(file) {
      this.videoURL = file.url;

      //获取视频的弹幕信息
      let vMd5 = await this.getFileMd5(file.raw);
      let fileSize = file.size;

      this.tap(vMd5);
      this.tap(fileSize);

      //立刻开始播放
      this.switchVideo(this.videoURL, "");

      //寻找弹幕资源
      let resData = (await API.getVideosInfo(fileSize, vMd5)).data;
      this.tap(resData);

      let videosInfo = resData.data;
      if (resData.code === "0" || resData.msg === "OK") {
        //成功
        let danmakuId = videosInfo.danmakuId;
        //刷新并装填弹幕
        this.switchVideo(this.videoURL, danmakuId);
      } else {
        this.hasInfo = false;
        this.activeNames = ["2"];
      }
    },
    switchVideo(videoURL, danmakuId) {
      const player = this.$refs.player.dp;
      player.switchVideo(
        {
          url: this.videoURL
        },
        {
          id: danmakuId,
          api: "http://api.echisan.cn/dplayer/",
          token: "tokendemo",
          maximum: 1000,
          // addition: ['https://api.prprpr.me/dplayer/bilibili?aid=4157142'],
          user: "DIYgod",
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
          this.states = rs.data;
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
    }
  },
  mounted() {
    //动画Fix 全屏问题
    setTimeout(() => {
      document
        .getElementsByClassName("watchVideo")[0]
        .setAttribute("class", "watchVideo");
    }, 1000);

    this.login();
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
  animation-fill-mode: forwards;
}
.dplayer {
  border-radius: 5px;
}
.dragArea {
  animation: ShowVideo 0.4s;
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
