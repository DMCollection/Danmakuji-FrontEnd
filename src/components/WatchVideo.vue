<template>
<div class="watchVideo Anime">

<div class="container">
<el-collapse class="dragArea" v-model="activeNames" accordion>
  <el-collapse-item title="请将番剧拖入此处" name="1">
  <el-upload
  class="upload-demo"
  drag
  :multiple="false"
  :auto-upload="false"
  :on-change="handleChange"
  action="/">
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将番剧拖到此处，或<em>点击打开</em></div>
</el-upload>
  </el-collapse-item>

  <el-collapse-item v-show="!hasInfo" title="未能正确识别番剧,请手动输入搜索" name="2">
    
  <div class="search">
    <el-input v-model="searchInput" placeholder="请输入内容"></el-input>
  <el-button icon="el-icon-search" circle @click="play"></el-button>
  </div>

  </el-collapse-item>



</el-collapse>
</div>

    <div class="playerWrapper playerWrapper-showAnim">
    <div id="dplayer"><d-player :options="playerOpts" ref="player"></d-player></div>

    
    </div>
</div>
    
</template>

<script>
// import '../assets/md5.js'
import hashMe from '../assets/hashme.js'
import VueDPlayer from 'vue-dplayer'
// import '../node_modules/vue-dplayer/vue-dplayer.css'
import 'DPlayer/dist/DPlayer.min.css';
import axios from 'axios'


export default {
  data(){
    return{
      hasInfo:!true,
      searchInput:"",
      activeNames: ['1'],
      videoInput:"",
      videoURL:"",
      playerOpts:{
            autoplay: true,
            theme: '#FADFA3',
            lang: 'zh-cn',
            screenshot: true,
            hotkey: true,
            preload: 'auto',
            // logo: '/static/logo.png',
            volume: 0.7,
            mutex: true,

            video: {
                url: this.videoURL,
                // url: "http://static.smartisanos.cn/common/video/t1-ui.mp4",
                
                pic: '/static/placeholder.png',
                thumbnails: 'thumbnails.jpg',
                type: 'auto'
            },
            subtitle: {
                url: 'dplayer.vtt',
                type: 'webvtt',
                fontSize: '25px',
                bottom: '10%',
                color: '#b7daff'
            },
            danmaku: {
                id: '9E2E3368B56CDBB4',
                api: 'https://api.prprpr.me/dplayer/',
                token: 'tokendemo',
                maximum: 1000,
                addition: ['https://api.prprpr.me/dplayer/bilibili?aid=4157142'],
                user: 'DIYgod',
                bottom: '15%',
                unlimited: true
            },
            contextmenu: [
                {
                    text: 'custom1',
                    link: 'https://github.com/DIYgod/DPlayer'
                },
                {
                    text: 'custom2',
                    click: (player) => {
                        console.log(player);
                    }
                }
            ]
        }
    }
  },
  components: {
    'd-player': VueDPlayer
  },
  methods: {
      play() {
        console.log('play callback');
        this.tap(this.videoURL);
        // this.initDPlayer(this.videoURL);
      },
      getFileMd5(fileRaw){
        new hashMe(fileRaw, (msg) =>{
              this.tap(msg);
        });
      },
      handleChange(file){
        
        this.tap(file);
        this.tap(file.url);
        this.videoURL=file.url;

        this.getFileMd5(file.raw);

        const player = this.$refs.player.dp;

        player.switchVideo({
            url: this.videoURL,
        },{
                id: '9E2E3368B56CDBB4',
                api: 'https://api.prprpr.me/dplayer/',
                token: 'tokendemo',
                maximum: 1000,
                addition: ['https://api.prprpr.me/dplayer/bilibili?aid=4157142'],
                user: 'DIYgod',
                bottom: '15%',
                unlimited: true
            });
      },
  },
  mounted(){
        setTimeout(()=>{
          document.getElementsByClassName("watchVideo")[0].setAttribute("class","watchVideo");
        },1000);
    // axios.get("/api/",(res)=>{
    //   this.tap(res);
    // })

    
  }

}
</script>

<style>
.container{
  margin: 2rem auto;
}

.playerWrapper{
  width: 50%;
  margin: 0 auto;
  border-radius: 5px;
  box-shadow: 0px 4px 20px 5px #00000036, 0px 4px 12px 0px #0000009c;
}
/*animation-fill-mode :forwards不能全屏*/
/*给最外层添加.Anime 产生fadeIn动画 */
.Anime .playerWrapper-showAnim{
  opacity: 0;
  animation: ShowVideo 0.6s;
  animation-delay: 0.4s;
  animation-fill-mode :forwards;
}
.dplayer{
  border-radius: 5px;
}
.dragArea{
    animation: ShowVideo 0.4s;
}
.search{
  width: 80%;
  margin:2rem auto;
  position: relative;
  animation: ShowVideo 0.4s;
}
.search .el-input{
  width:80%;
}
.search .el-button{
      right: 40px;
    position: relative;
}
.search input{
      border-radius: 25px;
}
.upload-demo{
  display: inline-block;
}

@keyframes ShowVideo {
  0%{
    opacity: 0;
    transform:scale(.5) translateY(-8em);
  }
  100%{
    opacity: 1;
    transform:scale(1) translateY(0);
  }
}
</style>
