<template>
  <div class="hello">
    <div class="dk-search-tr">
      <div v-if="notice && showNotice" class="notify">
        <div class="content">
          <i class="el-icon-bell notify-bell"></i>
          <a :href="'#/announce/'+notice.id" class="notify-link">{{notice.title}}</a>
          <i @click="closeNotice" class="el-icon-close notify-close"></i>
        </div>
      </div>
      <div class="search-container">
        <el-input placeholder="搜索" @keyup.enter.native="searchBangumisByName(searchBangumiName)" v-model="searchBangumiName" class="dk-search-ipt"></el-input>
        <el-button @click="searchBangumisByName(searchBangumiName)" type="text" class="dk-search-btn" icon="el-icon-search"></el-button>
      </div>
    </div>

    <div>
      <div class="top" v-show="!showSearchResult">
        <el-carousel :interval="500000" type="card" height="320px">
          <el-carousel-item v-for="b in bangumis" :key="b.bangumiId">
            <div>
              <a @click="goBangumiDetail(b)" href="javascript:void(0);" class="c-img" :style="{'background-image':'url('+b.thumb+')'}">
              </a>
            </div>
            <div class="dk-shadow">
              <span class="dk-b-name">{{b.bangumiName}}</span>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <div v-if="showSearchResult" class="dk-search-res">
      <h1 v-if="searchBangumis === ''">什么都没有找到</h1>
      <h1 v-else="">搜索结果</h1>
      <bangumi-card :bangumi="bres" v-for="bres in searchBangumis" :key="bres.bangumiId"></bangumi-card>
    </div>
    <div v-if="!searchResloading" class="page page-container">
      <el-pagination v-show="page.totalSize>10" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="page.pageNumber"
                     :page-sizes="[10,20,30,40,50]" :page-size="page.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="page.totalSize">

      </el-pagination>
    </div>

  </div>
</template>

<script>
  import API from "../api/api"
  import BangumisCard from "./BangumiCard.vue"
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  components:{
    "bangumi-card": BangumisCard
  },
  data(){
    return {
      bangumis: "",
      page: "",
      showSearchResult: false,
      searchBangumis: "",
      searchPage: "",
      searchBangumiName: "",
      snForPageSearch: "",
      searchResloading: true,
      notice: "",
      showNotice: false,
      lastNoticeId: "",
      curNoticeId: ""
    }
  },
  methods:{
    async initBangumis(){
      let res = await API.getMostViewBangumis();
      let rd = res.data;
      if(rd.code === 0){
        this.bangumis = rd.data.bangumi;
      }
      else {
        console.log("no data.");
      }
    },
    async searchBangumisByName(name){
      if(name === ""){
        return
      }
      this.snForPageSearch = name;
      let res = await API.getsearchBangumisIdResult(name);
      let rd = res.data;
      console.log("searchRes:",rd);
      if(rd.code === 0){
        this.searchBangumis = rd.data.content;
        this.page = rd.data.page;
        this.showSearchResult = true;
        this.searchResloading = false;
      }
      else {
        console.log("no bangumi search result");
        this.searchBangumis = "";
        this.showSearchResult = true;
      }
    },
    goBangumiDetail(bangumi){
      console.log("go bangumiDetail!");
      this.$router.push({name:'bangumidetail',params:{bid:bangumi.bangumiId,bangumi:bangumi}});
    },
    async handleCurrentChange(val){
      console.log("pageNum:",val);
      let res = await API.searchBangumisByName(this.snForPageSearch,val,this.page.pageSize);
      let rd = res.data;
      if(rd.code === 0){
        this.searchBangumis = rd.data.content;
        this.page = rd.data.page;
      }
      else {
        console.log("error search bangumis in page");
      }
    },
    async handleSizeChange(val){
      console.log("pageSize:",val);
      let res = await API.searchBangumisByName(this.snForPageSearch,1,val);
      let rd = res.data;
      if(rd.code === 0){
        this.searchBangumis = rd.data.content;
        this.page = rd.data.page;
      }
      else {
        console.log("error search bangumis in page");
      }
    },
    async getNotice(){
      let res = await API.getNotice();
      let rd = res.data;
      console.log(rd);
      if(rd.code === 0){
        this.notice = rd.data.indexNotice;
        if(rd.data.indexNotice === null){
          this.showNotice = false;
          return
        }
        this.curNoticeId = rd.data.indexNotice.id;
        if(this.lastNoticeId !== null){
          if(this.lastNoticeId !== this.curNoticeId){
            this.showNotice = true;
          }
        }
        else {
          this.showNotice = true;
        }
      }
      else {
        console.log("get notice err");
      }
    },
    closeNotice(){
      localStorage.setItem("lastNoticeId",this.curNoticeId);
      this.showNotice = false;
      console.log("close notice.");
    }
  },
  created(){
    console.log("helloworld.vue created!");
    this.lastNoticeId = localStorage.getItem("lastNoticeId");
    this.initBangumis();
    this.getNotice();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  width: 980px;
  margin: 0 auto;
  text-align: center;
}
  .top {
    width: 960px;
    display: inline-block;
  }
  .c-img {
    width: 640px;
    height: 320px;
    background-repeat: no-repeat;
    display: inline-block;
    background-size: contain;

    /*position: absolute;*/
  }
  .top {
    animation: ShowVideo 0.6s;;
  }
  .dk-b-name {
    color: #fff;
    font-size: 16px;
    display: inline-block;
    margin-top: 10px;
  }
  .dk-shadow {
    position: absolute;
    width: 100%;
    height: 40px;
    bottom: 0;
    left: 0;
    background: linear-gradient(-180deg,transparent,rgba(0,0,0,.75));
  }
  .dk-search-res {
    margin-top: 60px;
    width: 980px;
    text-align: left;
  }
  .notify {
    animation: ShowVideo 0.8s;
  }
</style>
<style>
  .dk-search-tr {
    width: 100%;
    height: 50px;
    margin-bottom: 30px;
    margin-top: 30px;
  }
  .notify {
    display: inline-block;
  }
  .notify .content {
    display: inline-block;
    border: 1px solid #f8dfaa;
    width: 600px;
    background-color: #fff1d3;
    color: #e78b1f;
    position: relative;
    line-height: 30px;
    text-align: left;
    border-radius: 4px;
  }
  .notify .content a:hover {
    cursor: pointer;
  }
  .notify-bell {
    left: 10px;
    top: 6px;
    position: absolute;
  }
  .notify-close {
    right: 10px;
    top: 6px;
    position: absolute;
  }
  .notify-link {
    margin-left: 35px;
    font-size: 14px;
  }

  .search-container {
    width: 250px;
    float: right;
    background: #262633;
    animation: ShowVideo 0.4s;
  }
  .dk-search-ipt {
    width: 200px;
    float: left;
  }
  .dk-search-ipt input {
    border: 0;
  }
  .dk-search-btn {
    position: absolute;
  }

</style>
<style>
  .page-container .el-pagination .btn-prev {
    background-color: #141422;
    color: #e4e4e6;
  }

  .page-container .el-pagination .btn-prev:hover {
    color: #37c8f7;
  }

  .page-container .el-pagination .number {
    background-color: #141422;
  }

  .page-container .el-pagination .btn-next {
    background-color: #141422;
    color: #e4e4e6;
  }

  .page-container .el-pagination .btn-next:hover {
    color: #37c8f7;
  }

  /*.page-container .el-pagination button:disabled {*/
  /*background-color: #262633;*/
  /*}*/
  .page-container .el-pager li {
    color: #e4e4e6;
    min-width: 28px;
    margin: 0 3px;
  }

  .page-container .el-pager li:hover {
    /*color: darkred;*/
    background-color: #37c8f7;
    border-radius: 50%;
  }

  .page-container .el-pager li.active {
    border-radius: 50%;
    background-color: #37c8f7;
  }

</style>
